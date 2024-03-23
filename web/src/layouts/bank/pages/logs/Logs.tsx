import React from 'react';
import CharacterAccounts from '@/layouts/bank/pages/accounts/components/CharacterAccounts';
import TransactionItem from '@/layouts/bank/pages/logs/components/TransactionItem';
import Pagination from '@/layouts/bank/components/Pagination';
import { useActiveAccount } from '@/state/accounts/accounts';
import { ServerOff } from 'lucide-react';
import locales from '@/locales';
import BaseCard from '@/layouts/bank/components/BaseCard';
import { History } from 'lucide-react';
import type { LogsData } from '~/typings';

const Logs: React.FC = () => {
  const activeAccount = useActiveAccount();

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

  for (let i = 0; i < 8; i++) {
    let type: 'inbound' | 'outbound' = Math.random() < 0.5 ? 'inbound' : 'outbound';
    data.transactions.push({
      amount: Math.random() * 5000 + 1000,
      date: '28/10/2023 at 12:30',
      message: getRandomText(),
      type: type,
      fromId: type === 'inbound' ? Math.random() < 0.5 ? '1000001' : undefined : undefined,
      toId: type === 'outbound' ? Math.random() < 0.5 ? '1000001' : undefined : undefined,
    });
  }

  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-hidden p-2">
      <React.Suspense fallback={<p>Loading...</p>}>
        <CharacterAccounts />
      </React.Suspense>
      {activeAccount ? (
        <BaseCard title={locales.logs} icon={History} className='h-full gap-0'>
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
          <Pagination totalPages={data.totalPages} currentPage={data.currentPage} className='mt-auto' />
        </BaseCard>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center text-muted-foreground">
          <ServerOff size={32} />
          <p className="text-xl">{locales.no_account_selected}</p>
        </div>
      )}
    </div>
  );
};

export default Logs;
