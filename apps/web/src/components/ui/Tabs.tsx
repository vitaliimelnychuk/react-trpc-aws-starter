import { Select, SelectOption } from '@web/components/ui/Form/Select';
import { cx } from '@web/utility';

interface TabsType {
  id: string;
  name: string;
  Component: React.FC;
  rightContent?: JSX.Element;
  icon?: JSX.Element;
}

type TabsProps = {
  active: string;
  tabs: TabsType[];
  onChange?: (id: string) => void;
};

function Tabs({ active, tabs, onChange = () => null }: TabsProps) {
  const activeTab = tabs.find((tab) => tab.id === active);

  const options = tabs.map((tab) => ({
    id: tab.name,
    name: tab.name
  }));

  const selectedOption: SelectOption =
    options.find((option) => option.id === active) || options[0];

  return (
    <>
      <div className="mb-4 border-b border-gray-200 ">
        <div className="sm:hidden">
          <Select
            onChange={(newValue) => {
              if (!newValue.id) return;
              onChange(newValue.id.toString());
            }}
            selected={selectedOption}
            options={options}
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <nav
            className="hidden sm:flex flex-wrap mb-4 lg:mb-0"
            aria-label="Tabs"
          >
            {tabs.map((tab) => (
              <div
                key={tab.name}
                className={cx(
                  tab.id === active
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700',
                  'px-3 py-4 font-medium text-sm cursor-pointer mr-2'
                )}
                aria-current={tab.name === active ? 'page' : undefined}
                onClick={() => {
                  if (tab.id === active) return;
                  onChange(tab.id);
                }}
              >
                <div className="flex flex-center items-end gap-1">
                  <div
                    style={{ paddingTop: '1.5px' }}
                    className={`inline-block w-5 mr-1`}
                  >
                    {tab.icon}
                  </div>
                  <span>{tab.name}</span>
                </div>
              </div>
            ))}
          </nav>
          <div className="m-4 sm:m-2 lg:self-start min-w-[100px]">
            {activeTab?.rightContent ?? null}
          </div>
        </div>
      </div>
      <div>{activeTab && <activeTab.Component />}</div>
    </>
  );
}

export default Tabs;
