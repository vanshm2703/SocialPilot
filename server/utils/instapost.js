import { IgApiClient } from 'instagram-private-api';
import { writeFile, readFile } from 'fs/promises';
import { config } from 'dotenv';
import got from 'got';
import path from 'path';
import * as readline from 'readline';

config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise(resolve => rl.question(query, resolve));
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Instagram client setup
const ig = new IgApiClient();

async function handleLoginChallenge() {
    try {
        console.log('🔒 Security challenge required. Resolving...');

        // Get challenge status
        const challengeData = await ig.challenge.state();
        console.log('Challenge data:', challengeData);

        if (!challengeData || !challengeData.step_name) {
            throw new Error('⚠️ No valid challenge data available.');
        }

        // Choose verification method
        console.log('📩 Requesting verification code via email...');
        await ig.challenge.selectVerifyMethod(1); // 1 for email, 0 for SMS
        
        // Get code from user
        const code = await question('💬 Enter the verification code sent to your email: ');

        // Submit the code
        const result = await ig.challenge.sendSecurityCode(code.trim());

        console.log('✅ Challenge resolved successfully!');
        return result;
    } catch (error) {
        console.error('⚠️ Challenge resolution failed:', error);
        return false;
    }
}


async function saveSession(sessionData) {
    try {
        await writeFile(
            path.join(process.cwd(), 'session.json'), 
            JSON.stringify(sessionData)
        );
        console.log('Session saved successfully');
    } catch (error) {
        console.error('Failed to save session:', error);
    }
}

async function loadSession() {
    try {
        const sessionData = await readFile(
            path.join(process.cwd(), 'session.json'), 
            'utf8'
        );
        return JSON.parse(sessionData);
    } catch {
        return null;
    }
}

async function login() {
    try {
        console.log('Starting login process...');
        
        // Generate device
        const username = process.env.IG_USERNAME || '_entertainment__hub_001';
        const password = process.env.IG_PASSWORD || 'Sattva@123';
        
        ig.state.generateDevice(username);

        // Try to load existing session
        const savedSession = await loadSession();
        if (savedSession) {
            try {
                await ig.state.deserialize(savedSession);
                const loggedInUser = await ig.user.info(ig.state.cookieUserId);
                console.log(`Logged in using saved session as ${loggedInUser.username}`);
                return true;
            } catch (sessionError) {
                console.log('⚠️ Saved session expired, proceeding with fresh login');
            }
        }

        // Attempt fresh login
        try {
            const loggedInUser = await ig.account.login(username, password);
            console.log(`✅ Logged in as ${loggedInUser.username}`);
            
            // Save successful session
            const serialized = await ig.state.serialize();
            await saveSession(serialized);
            
            return true;
        } catch (error) {
            console.log('🚨 Login failed:', error.name);

            if (error.name === 'IgCheckpointError') {
                console.log('🔍 Challenge detected, resolving...');
                await delay(5000); 
                return await handleLoginChallenge();
            } 
            
            if (error.name === 'IgLoginBadPasswordError') {
                console.error('❌ Incorrect password provided');
                return false;
            } 
            
            if (error.name === 'IgNetworkError') {
                console.error('🌐 Network error: Check your internet connection or proxy.');
                return false;
            }

            console.error('⚠️ Unexpected Login Error:', error);
            return false;
        }
    } catch (error) {
        console.error('⚠️ Unexpected error in login process:', error);
        return false;
    }
}


async function validateImageUrl(url) {
    try {
        const response = await got.head(url);
        const contentType = response.headers['content-type'];
        return contentType.startsWith('image/');
    } catch {
        return false;
    }
}

async function postToInsta(imageUrl, caption) {
    try {
        console.log('Starting Instagram post process...');

        if (!(await validateImageUrl(imageUrl))) {
            throw new Error('Invalid image URL or image not accessible');
        }

        // Login with retry mechanism
        let loginSuccess = false;
        for (let i = 0; i < 3; i++) {
            loginSuccess = await login();
            if (loginSuccess) break;
            console.log(`Login attempt ${i + 1} failed, retrying...`);
            await delay(5000); // Wait 5 seconds between attempts
        }

        if (!loginSuccess) {
            throw new Error('Failed to login after multiple attempts');
        }

        await delay(2000);

        console.log('Downloading image...');
        const imageBuffer = await got(imageUrl).buffer();

        await delay(2000);

        console.log('Publishing photo...');
        const result = await ig.publish.photo({
            file: imageBuffer,
            caption: caption || 'Check out this awesome image!',
        });

        console.log('Post published successfully!');
        return result;
    } catch (error) {
        console.error('Failed to post to Instagram:', error.message);
        throw error;
    } finally {
        rl.close();
    }
}

async function main() {
    try {
        const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuJ2d7OfgA7wC_WK8Zu4ok9EvJ2Crez758dkvCSkY2UtbLtFXgI7_tumpLGbCb-2Eh0Hw&usqp=CAU';
        const caption = 'Testing automated Instagram post! 📸';
        
        await postToInsta(imageUrl, caption);
    } catch (error) {
        console.error('Main process failed:', error.message);
        process.exit(1);
    }
}

main();