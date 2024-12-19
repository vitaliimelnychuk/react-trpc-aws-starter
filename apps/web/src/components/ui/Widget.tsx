import { Card } from '@tremor/react';

type WidgetProps = React.PropsWithChildren<{
  title?: string;
  className?: string;
}>;

export function Widget({ title = '', className, children }: WidgetProps) {
  return (
    <div className={className}>
      <Card>
        <h3 className="mb-3 text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {title}
        </h3>
        <div>{children}</div>
      </Card>
    </div>
  );
}

export default Widget;
