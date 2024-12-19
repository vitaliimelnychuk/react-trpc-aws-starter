import { cx } from '@web/utility';

export type AvatarProps = {
  src?: string | null;
  alt?: string;
  height?: number;
  width?: number;
  className?: string;
  text?: string;
  textClassName?: string;
};

export function Avatar({
  src,
  alt = '',
  height = 32,
  width = 32,
  className = '',
  text = '',
  textClassName = ''
}: AvatarProps) {
  return src ? (
    <div
      className="relative inline-block"
      style={{
        width: `${width}px`,
        height: `${height}px`
      }}
    >
      <img
        className={cx(
          'rounded-full ring-2 ring-white relative inline-flex items-center justify-center overflow-hidden',

          className
        )}
        src={src}
        alt={alt}
        style={{
          minWidth: `${width}px`,
          minHeight: `${height}px`
        }}
        height={`${height}px`}
        width={`${width}px`}
      />
    </div>
  ) : (
    <div className="relative">
      <div
        className={cx(
          'relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ',
          className,
          !width && !height ? 'w-10 h-10' : ''
        )}
        style={{
          width: `${width}px`,
          height: `${height}px`
        }}
      >
        <span className={cx('text-gray-600 dark:text-gray-300', textClassName)}>
          {text[0]?.toUpperCase() || ''}
        </span>
      </div>
    </div>
  );
}
export default Avatar;
