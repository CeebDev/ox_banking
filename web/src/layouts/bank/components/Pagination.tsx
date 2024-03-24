import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  totalPages: number;
  currentPage: number;
  className?: string;
}

const BaseCard: React.FC<Props> = (props) => {
  return (
    <div className={cn('flex items-center w-full h-10 text-sm select-none justify-between', props.className)}>
      <button className="flex items-center mr-2 text-gray-500 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none opacity-50">
        <ArrowLeft
          className="mr-3"
          size={20}
        />
        Previous
      </button>

      <div>
        <span className='text-gray-600 dark:text-gray-200 mx-2 cursor-pointer'>1</span>
        <span className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-200 mx-2 cursor-pointer">2</span>
        <span className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-200 mx-2 cursor-pointer">3</span>
        <span className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-200 mx-2 cursor-pointer">...</span>
        <span className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-200 mx-2 cursor-pointer">{props.totalPages}</span>
      </div>
      <button className="flex items-center mr-2 text-gray-500 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none cursor-pointer">
        Next
        <ArrowRight
          className="ml-3"
          size={20}
        />
      </button>
    </div>
  );
};

export default BaseCard;
