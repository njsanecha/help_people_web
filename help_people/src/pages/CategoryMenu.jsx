import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

export default function CategoryMenu({ category, products, onProductClick }) {
  const categoryProducts = products.filter(
    (prod) => prod.category_id === category.id
  );

  return (
    <Popover className="flex">
      <div className="relative flex">
        <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-open:border-indigo-600 data-open:text-indigo-600">
          {category.name}
        </PopoverButton>
      </div>

      <PopoverPanel
        transition
        className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in">
        <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow-sm" />
        <div className="relative bg-white">
          <div className="mx-auto max-w-7xl px-8">
            <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
              {categoryProducts.length > 0 ? (
                categoryProducts.map((item) => (
                  <div key={item.id} className="group relative text-base sm:text-sm">
                    <img
                      src={'../src/placeholder.png'}
                      className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"/>
                    <button
                      onClick={() => onProductClick(item)}
                      className="mt-6 block font-medium text-gray-900 cursor-pointer">
                      <span aria-hidden="true" className="absolute inset-0 z-10" />
                      {item.name}
                    </button>
                    <p className="mt-1">Comprar ahora!</p>
                  </div>
                ))
              ) : (
                <p className="col-span-4 text-gray-500 italic">No products in this category.</p>
              )}
            </div>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
