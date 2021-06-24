import React from 'react';
import { useHistory } from 'react-router';
import { useConfig } from '@bf2/ui-shared';
import { Loading, FederatedModule } from '@app/components';
import { KafkaRequest } from '@openapi/kas';

type InstanceDrawerProps = {
  kafkaDetail: KafkaRequest | undefined;
  isExpanded: boolean | undefined;
  activeTab: string;
  onClose: () => void;
  isOpenDeleteInstanceModal: boolean;
  setIsOpenDeleteInstanceModal: (isopen: boolean) => void;
};

export const InstanceDrawer: React.FC<InstanceDrawerProps> = ({
  isExpanded,
  onClose,
  kafkaDetail,
  activeTab,
  children,
  setIsOpenDeleteInstanceModal,
  isOpenDeleteInstanceModal,
}) => {
  const config = useConfig()
  if (config === undefined) {
    return <Loading />;
  }

  const { authServerUrl, realm } = config?.masSso || {};
  const tokenEndPointUrl = `${authServerUrl}/realms/${realm}/protocol/openid-connect/token`;

  return (
    <FederatedModule
      scope="kas"
      module="./InstanceDrawer"
      render={(InstanceDrawerFederated) => {
        return (
          <InstanceDrawerFederated
            tokenEndPointUrl={tokenEndPointUrl}
            isExpanded={isExpanded}
            onClose={onClose}
            instanceDetail={kafkaDetail}
            activeTab={activeTab}
            isOpenDeleteInstanceModal={isOpenDeleteInstanceModal}
            setIsOpenDeleteInstanceModal={setIsOpenDeleteInstanceModal}
          >
            {children}
          </InstanceDrawerFederated>
        );
      }}
    />
  );
};
