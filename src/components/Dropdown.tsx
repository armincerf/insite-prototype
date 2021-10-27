import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { classNames } from "../utils/helpers";

type Item = { label: string; value: string };

type Props = {
  items: Array<Item>;
  selected: string;
  onSelect: (value: string) => void;
};

export function Dropdown({ items, selected, onSelect }: Props) {
  return (
    <Menu as="div" className="relative w-56 z-50 inline-block text-left isolate">
      <Menu.Button className="inline-flex items-center bg-primary text-white h-full justify-center w-full rounded-l-md px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
        {items.find((item) => item.value === selected)?.label ?? "Custom"}
        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {items.map(({ label, value }) => {
              const active = value === selected;
              return (
                <Menu.Item key={label}>
                  <button
                    className={classNames(
                      "block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900",
                      active ? "bg-gray-100 text-primary" : "text-secondary"
                    )}
                    type="button"
                    onClick={() => {
                      onSelect(value);
                    }}
                  >
                    {label}
                  </button>
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
