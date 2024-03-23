import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowUpRight, ArrowDownRight, Copy } from 'lucide-react';
import { formatNumber } from '@/utils/formatNumber';
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
  return (
    <div className={cn('flex items-center rounded p-2 transition-all', props.className)}>
      <Avatar className='h-9 w-9'>
        <AvatarFallback>
          {props.type === 'outbound' ?
            <ArrowDownRight className='text-destructive' /> :
            <ArrowUpRight className='text-primary' />
          }
        </AvatarFallback>
      </Avatar>
      <div className='mx-4'>
        <p className='text-xs text-muted-foreground'>Date</p>
        <p className='text-sm flex'>
          <div className='mr-2'>{props.date}</div>
        </p>
      </div>
      <div className='mx-4'>
        <p className='text-xs text-muted-foreground'>Message</p>
        <p className='text-sm flex'>
          <div className='mr-2'>{props.message ?? locales.no_message}</div>
        </p>
      </div>
      <div        className={cn('font-medium ml-auto', props.type === 'outbound' && 'text-destructive')}>{`${props.type === 'inbound' ? '+' : '-'}`}{formatNumber(props.amount)}</div>
      <div className='mx-4 w-[10%]'>
        {(props.type === 'outbound' && props.toId || props.type === 'inbound' && props.fromId) && (
          <>
            <p className='text-xs text-muted-foreground'>{props.type === 'inbound' ? 'From' : 'To'}</p>
            <p className='text-sm flex'>
              <div className='mr-2'>1000001</div>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <button className="flex items-center">
                    <Copy size={14} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>{locales.copy}</TooltipContent>
              </Tooltip>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionItem;
