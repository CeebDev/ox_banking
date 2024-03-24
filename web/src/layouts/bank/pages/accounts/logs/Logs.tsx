import React from 'react';
import TransactionItem from '@/layouts/bank/pages/accounts/logs/components/TransactionItem';
import { Input } from '@/components/ui/input';
import locales from '@/locales';
import BaseCard from '@/layouts/bank/components/BaseCard';
import { History, ArrowUp01, ArrowDown01 } from 'lucide-react';
import type { LogsData } from '~/typings';
import { useParams } from 'react-router-dom';
import Pagination from '@/layouts/bank/components/Pagination';

const Logs: React.FC = () => {
  const { accountId } = useParams();

  const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do'];

  function getRandomText() {
    const textLength = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    let text = '';

    for (let i = 0; i < textLength; i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      text += words[randomIndex] + ' ';
    }

    return text.trim(); // Remove trailing space
  }

  const data: LogsData = {
    transactions: [],
    totalPages: 20,
    currentPage: 1,
  }

  for (let i = 0; i < 10; i++) {
    let type: 'inbound' | 'outbound' = Math.random() < 0.5 ? 'inbound' : 'outbound';
    data.transactions.push({
      amount: Math.random() * 5000 + 1000,
      date: '28/10/2023 12:30',
      message: getRandomText(),
      type: type,
      fromId: type === 'outbound' ? '932122' : Math.random() < 0.5 ? "955112" : undefined,
      toId: type === 'inbound' ? '932122' : Math.random() < 0.5 ? "955112" : undefined
    });
  }

  return (
    <div className='flex w-full h-full p-2 gap-2 flex-col'>
      <BaseCard title={locales.logs} icon={History} className='h-full'>
        <Input placeholder="Search for transaction" />
        <div className='flex flex-col justify-between h-full border border-border rounded-lg p-4'>
            <div className="grid text-sm border-b grid-cols-[7%_15%_58%_20%] p-1">
              <p className='flex cursor-pointer self-center justify-self-start'>Type <ArrowUp01 size={18} className='ml-2' /></p>
              <p className='flex mx-4 cursor-pointer self-center justify-self-start'>Date <ArrowDown01 size={18} className='ml-2' /></p>
              <p className='flex mx-4 cursor-pointer self-center justify-self-start'>Message <ArrowUp01 size={18} className='ml-2' /></p>
              <p className='flex cursor-pointer self-center justify-self-end'>Amount <ArrowUp01 size={18} className='ml-2' /></p>
            </div>
            {data.transactions?.map((transaction) => (
              <TransactionItem
                className='hover:bg-primary dark:hover:bg-primary/20'
                key={`${transaction.amount}-${transaction.date}`}
                amount={transaction.amount}
                message={transaction.message}
                date={transaction.date}
                type={transaction.type}
                fromId={transaction.fromId}
                toId={transaction.toId}
              />
            ))}
        </div>
        <Pagination totalPages={data.totalPages} currentPage={data.currentPage} />
      </BaseCard>
    </div>
  );
};

export default Logs;
