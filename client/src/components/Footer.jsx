import React from 'react';

const navigation = {
  connect: [
    { name: 'Book Meeting', href: '' },
    { name: 'Twitter', href: 'https://twitter.com/justansub' },
    { name: 'Github', href: 'https://www.youtube.com/@SpeedyBrand-SEO' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/speedy-brand-inc/' },
  ],
  company: [
    { name: 'Blogs', href: '/' },
    { name: 'Pricing', href: '/' },
    { name: 'Affiliate Partner', href: '/' },
    { name: 'AI For Enterprise', href: '/' },
  ],
};

const Footer = () => {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="font-inter pb-5 w-full bg-black/85 text-white"
    >
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col justify-between lg:flex-row">
          {/* Footer Content Left */}
          <div className="space-y-8">
            <p className="text-md max-w-xs leading-6">
              Not your average component library - build faster, launch sooner.
            </p>
            <div className="text-sm">
              <div>Made with ❤️.</div>
            </div>
          </div>
          {/* Footer Navigation */}
          <div className="mt-16 grid grid-cols-2 gap-14 md:grid-cols-2 lg:mt-0 xl:col-span-2">
            {/* Connect Section */}
            <div className="md:mt-0">
              <h3 className="text-sm font-semibold leading-6">Connect</h3>
              <div className="mt-6 space-y-4">
                {navigation.connect.map((item) => (
                  <div key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm leading-6 text-gray-400 hover:text-gray-200"
                    >
                      {item.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            {/* Company Section */}
            <div>
              <h3 className="text-sm font-semibold leading-6">Company</h3>
              <div className="mt-6 space-y-4">
                {navigation.company.map((item) => (
                  <div key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm leading-6 text-gray-400 hover:text-gray-200"
                    >
                      {item.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="mt-16 border-t border-gray-600 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs text-gray-400">
            &copy; 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
