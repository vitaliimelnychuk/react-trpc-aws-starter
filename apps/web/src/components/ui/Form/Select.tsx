import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import UserAvatar from '@web/components/ui/UserAvatar';
import { cx } from '@web/utility';

export type SelectOption = {
  id: string | number | null;
  name: string;
  avatar?: string | null;
  disabled?: boolean;
  isAll?: boolean;
};

type SelectProps = {
  onChange: (option: SelectOption) => void;
  selected: SelectOption | null;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  IconComponent?: typeof ChevronUpDownIcon;
  disabled?: boolean;
  showAvatars?: boolean;
};

export function Select({
  options,
  selected,
  label,
  IconComponent = ChevronUpDownIcon,
  onChange,
  placeholder,
  disabled,
  showAvatars = false
}: SelectProps) {
  return (
    <div className="w-full">
      <Listbox value={selected} onChange={onChange} disabled={disabled}>
        {label && (
          <Label className="block text-sm font-medium leading-6 text-gray-900">
            {label}
          </Label>
        )}
        <div className="relative mt-2">
          <ListboxButton
            className={cx(
              disabled ? 'opasity-50 cursor-default' : 'cursor-pointer',
              'relative w-full rounded-md py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6'
            )}
          >
            <span className="flex items-center gap-3">
              {selected && showAvatars && !selected?.isAll && (
                <UserAvatar
                  size="small"
                  user={{
                    avatar: selected.avatar,
                    email: selected.name
                  }}
                />
              )}

              <span
                className={cx(
                  disabled ? 'text-gray-400' : 'text-gray-900',
                  'block truncate'
                )}
              >
                {selected?.name || placeholder}
              </span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <IconComponent
                aria-hidden="true"
                className="h-5 w-5 text-gray-400"
              />
            </span>
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
          >
            {options.map((option) => (
              <ListboxOption
                key={option.id}
                value={option}
                disabled={option.disabled}
                className={cx(
                  option.disabled
                    ? 'opacity-50 cursor-default bg-gray-100'
                    : 'cursor-pointer',
                  'group relative select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white'
                )}
              >
                <div className="flex items-center">
                  {showAvatars && !option.isAll && (
                    <UserAvatar
                      size="small"
                      user={{
                        avatar: option.avatar,
                        email: option.name
                      }}
                    />
                  )}
                  <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                    {option.name}
                  </span>
                </div>

                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                  <CheckIcon aria-hidden="true" className="h-5 w-5" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}

export default Select;
