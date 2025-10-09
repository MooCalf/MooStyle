export const NavigationSecondary = () => {
  const categories = [
    { name: "Beauty", href: "/shopping/beauty" },
    { name: "Women", href: "/shopping/women" },
    { name: "Men", href: "/shopping/men" },
    { name: "Lifestyle", href: "/shopping/lifestyle" },
    { name: "Health", href: "/shopping/health" },
    { name: "Blog", href: "/blog", isTeal: true }
  ];

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-center h-10 sm:h-12">
          <div className="flex items-center space-x-3 sm:space-x-6 lg:space-x-8 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <a
                key={category.name}
                href={category.href}
                className="nav-secondary-link"
              >
                {category.name}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};