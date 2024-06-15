import React from 'react';
import { BsArrowRepeat } from 'react-icons/bs';

type RefreshButtonProps = {
  onClick: () => void;
};

const RefreshButton: React.FC<RefreshButtonProps> = ({ onClick }) => (
  <button className="text-gray-500" onClick={onClick}>
    <BsArrowRepeat />
  </button>
);

export default RefreshButton;
