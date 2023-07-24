import { useAtom } from 'jotai';

import FormItem from './FormItem';
import { advancedFilterConfig, filterConfig } from './reportConfig';
import { formDataAtom } from './store';

export const CreateFormItems = ({
  filtersMode,
}: {
  filtersMode: 'regular' | 'advance';
}) => {
  const [formData, setFormData] = useAtom(formDataAtom);

  const config = filtersMode === 'regular' ? filterConfig() : advancedFilterConfig;

  return (
    <>
      {config.map((conf) => {
        return (
          <FormItem
            key={conf.name}
            {...conf}
            {...conf.useGetData()}
            onSelect={(item) => {
              setFormData((a) => {
                a[conf.name] = item;
              });
            }}
            selectedItems={formData[conf.name]}
          />
        );
      })}
    </>
  );
};
