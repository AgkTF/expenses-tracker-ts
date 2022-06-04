import { ArrowLeftIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import * as Tabs from '@radix-ui/react-tabs';
import CategoriesTab from './CategoriesTab/CategoriesTab';

type Props = {};

const UserSettingsPage = (props: Props) => {
  let navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <section className="px-4 mt-8 w-full flex items-center">
          <button
            type="button"
            className="p-2 text-slate-700 bg-slate-100 rounded-md shadow"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <h1 className="w-full font-bold text-xl text-slate-600 text-center">
            User Settings
          </h1>
        </section>
      </div>

      <section className="px-4 mt-8">
        <Tabs.Root className="flex flex-col w-full" defaultValue="categories">
          <Tabs.List
            className="shrink-0 flex border border-x-0 border-t-0 border-b-slate-300"
            aria-label="Add your settings"
          >
            <Tabs.Trigger value="currencies" className="styled-trigger">
              Currencies
            </Tabs.Trigger>
            <Tabs.Trigger value="categories" className="styled-trigger">
              Categories
            </Tabs.Trigger>
            <Tabs.Trigger value="cards" className="styled-trigger">
              Cards
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="currencies"></Tabs.Content>
          <Tabs.Content value="categories">
            <CategoriesTab />
          </Tabs.Content>
          <Tabs.Content value="currencies"></Tabs.Content>
        </Tabs.Root>
      </section>
    </>
  );
};

export default UserSettingsPage;
