import React from 'react';
import { Text } from '@tarojs/components';
import './index.less';
import { IconFontType } from '@/utils/iconfont';

interface IconFontProps {
  type: IconFontType;
  className?: string;
  color?: string;
  size?: number;
  onClick?: () => void;
}

const IconFont: React.FC<IconFontProps> = ({ 
  type, 
  color = '#A6A6A6',
  size = 18,
  onClick 
}) => {
  return (
    <Text
      className='iconfont'
      onClick={onClick}
      style={{
        color,
        fontSize: `${size}PX`
      }}
    >{type}</Text>
  );
};

export default IconFont; 