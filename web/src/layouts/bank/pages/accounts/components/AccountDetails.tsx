import React from 'react';
import { Copy, History, Landmark, Repeat, ScanText, Wallet } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { formatNumber } from '@/utils/formatNumber';
import AccountButton from '@/layouts/bank/pages/accounts/components/AccountButton';
import DepositWithdrawModal from '@/layouts/bank/pages/accounts/modals/DepositWithdrawModal';
import BaseCard from '@/layouts/bank/components/BaseCard';
import { useModal } from '@/components/ModalsProvider';
import { useActiveAccount } from '@/state/accounts/accounts';
import locales from '@/locales';
import TransferModal from '@/layouts/bank/pages/accounts/modals/TransferModal';
import { useNavigate } from 'react-router-dom';

const AccountDetails: React.FC = () => {
  const modal = useModal();
  const account = useActiveAccount()!;
  const navigate = useNavigate();

  return (
    <BaseCard title="Details" icon={ScanText} className="flex-1">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <p className="text-xs text-muted-foreground">{locales.account_name}</p>
            <p>{account.label}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-muted-foreground">{locales.account_type}</p>
            <p>{locales.personal_account}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <p className="text-xs text-muted-foreground">{locales.account_number}</p>
            <div className="flex items-center gap-2">
              <p>{account.id}</p>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <button className="flex items-center">
                    <Copy size={14} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>{locales.copy}</TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-muted-foreground">{locales.disposable_amount}</p>
            <p>{formatNumber(account.balance)}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground">{locales.account_owner}</p>
          <p>{account.owner}</p>
        </div>
      </div>
      <div className="flex h-full flex-col gap-2">
        <AccountButton
          label={locales.withdraw}
          icon={Wallet}
          onClick={() =>
            modal.open({
              title: locales.withdraw,
              children: <DepositWithdrawModal account={account} />,
            })
          }
        />
        <AccountButton
          label={locales.deposit}
          icon={Landmark}
          onClick={() =>
            modal.open({
              title: locales.deposit,
              children: <DepositWithdrawModal account={account} isDeposit={true} />,
            })
          }
        />
        <AccountButton
          label={locales.transfer}
          icon={Repeat}
          onClick={() => modal.open({ title: locales.transfer, children: <TransferModal account={account} /> })}
        />
        <AccountButton label={locales.logs} icon={History} onClick={() => navigate(`/accounts/logs/${account.id}`)} />
      </div>
    </BaseCard>
  );
};

export default AccountDetails;
