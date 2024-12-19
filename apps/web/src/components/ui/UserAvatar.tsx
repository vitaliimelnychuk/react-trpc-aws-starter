import { Avatar } from '@web/components/ui/Avatar';

type UserAvatarProps = {
  user: {
    avatar?: string | null;
    name?: string | null;
    email: string;
  };
  size?: 'small' | 'medium' | 'large' | 'xl' | '2xl';
};

export function UserAvatar({ user, size }: UserAvatarProps) {
  const attrs = {
    src: user?.avatar,
    alt: user?.name || user?.email,
    text: user?.name || user?.email
  };

  switch (size) {
    case 'small':
      return (
        <Avatar width={24} height={24} textClassName="text-xs" {...attrs} />
      );
    case 'medium':
      return (
        <Avatar
          width={32}
          height={32}
          textClassName="text-lg font-medium"
          {...attrs}
        />
      );
    case 'large':
      return (
        <Avatar
          width={40}
          height={40}
          textClassName="text-lg font-medium"
          {...attrs}
        />
      );
    case 'xl':
      return (
        <Avatar
          width={48}
          height={48}
          textClassName="text-lg font-medium"
          {...attrs}
        />
      );
    case '2xl':
      return (
        <Avatar
          width={80}
          height={80}
          textClassName="text-4xl font-medium"
          {...attrs}
        />
      );
  }

  return <Avatar {...attrs} />;
}

export default UserAvatar;
