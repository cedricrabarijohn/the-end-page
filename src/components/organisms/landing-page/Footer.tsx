import React from 'react';

interface FooterLinkProps {
  href: string;
  text: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, text }) => (
  <li>
    <a href={href} className="hover:text-red-400 transition opacity-80 hover:opacity-100">
      {text}
    </a>
  </li>
);

interface FooterColumnProps {
  title: string;
  links: { href: string; text: string }[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => (
  <div>
    <h3 className="font-bold text-lg mb-4">{title}</h3>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <FooterLink key={index} href={link.href} text={link.text} />
      ))}
    </ul>
  </div>
);

const Footer: React.FC = () => {
  const columns = [
    {
      title: "Product",
      links: [
        { href: "#", text: "Create" },
        { href: "#", text: "Examples" },
        { href: "#", text: "Pricing" }
      ]
    },
    {
      title: "Company",
      links: [
        { href: "#", text: "About" },
        { href: "#", text: "Blog" },
        { href: "#", text: "Careers" }
      ]
    },
    {
      title: "Legal",
      links: [
        { href: "#", text: "Privacy" },
        { href: "#", text: "Terms" },
        { href: "#", text: "Contact" }
      ]
    }
  ];

  const socialLinks: any[] = [
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <h2 className="title-font text-2xl font-bold mb-4">The<span className="text-red-500">End</span>.page</h2>
            <p className="max-w-xs opacity-80">Because every ending deserves a proper sendoff.</p>
          </div>
          {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {columns.map((column, index) => (
              <FooterColumn key={index} title={column.title} links={column.links} />
            ))}
          </div> */}
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="opacity-80">© 2025 TheEnd.page. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                className="hover:text-red-400 transition opacity-80 hover:opacity-100"
              >
                <i className={link.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
