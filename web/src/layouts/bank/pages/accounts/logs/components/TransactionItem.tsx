import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowUpRight, ArrowDownRight, ArrowRight } from 'lucide-react';
import { formatNumber } from '@/utils/formatNumber';
import { useActiveAccount } from '@/state/accounts/accounts';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import locales from '@/locales';

interface Props {
  date: string;
  amount: number;
  type: 'inbound' | 'outbound';
  message?: string;
  fromId?: string;
  toId?: string;
  className?: string;
}

const TransactionItem: React.FC<Props> = (props) => {
  const activeAccount = useActiveAccount();
  return (
    <div className={cn('grid grid-cols-[7%_15%_58%_20%] place-items-center rounded p-1 transition-all', props.className)}>
      <div className='flex self-center justify-self-start'>
        <Avatar className='h-9 w-9'>
          <AvatarFallback>
            {props.type === 'outbound' ?
              <ArrowDownRight className='text-destructive' /> :
              <ArrowUpRight className='text-primary' />
            }
          </AvatarFallback>
        </Avatar>
        </div>
      <div className='flex self-center justify-self-start'>
        <div className='mx-4'>
          <p className='text-xs flex'>
            <div className='mr-2'>{props.date}</div>
          </p>
          <p className='text-sm text-muted-foreground flex'>
            <span className='text-xs flex'>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <button className="flex items-center">
                    {props.fromId ? "#" + props.fromId : locales.unknown}
                  </button>
                </TooltipTrigger>
                <TooltipContent>From account ID</TooltipContent>
              </Tooltip>
              <ArrowRight className='mx-2 w-3' />
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <button className="flex items-center">
                    {props.toId ? "#" + props.toId : locales.unknown}
                  </button>
                </TooltipTrigger>
                <TooltipContent>To account ID</TooltipContent>
              </Tooltip>
            </span>
          </p>
        </div>
      </div>
        <div className='mx-4 self-center justify-self-start'>
          <p className='text-xs text-muted-foreground'>Message</p>
          <p className='text-sm flex'>
            <div className='mr-2 overflow-ellipsis whitespace-nowrap'>{props.message ?? locales.no_message}</div>
          </p>
        </div>
        <div className={cn('font-medium ml-auto text-right', props.type === 'outbound' && 'text-destructive')}>
          {`${props.type === 'inbound' ? '+' : '-'}`}{formatNumber(props.amount)}
        </div>
    </div>
  );
};

export default TransactionItem;
