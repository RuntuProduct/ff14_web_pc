const agentSend = {
  obj: {
    tar: 'obj',
    map: {
      auditStatus: 'state',
      bName: 'name',
      merchantId: 'id',
      create: 'date',
    },
  },
  pageProps: {
    tar: 'pageProps',
    map: {
      page: 'page',
      size: 'pageSize',
    },
  },
}

const agentGet = {
  list: {
    tar: 'list',
    map: [{
      id: 'agentId', // 渠道编号、渠道id
      outId: 'bOutAgentId', // 外部渠道号
      name: 'bName',  // 渠道名

      parentAgentId: 'bParentAgentId',  // 所属渠道id
      parentAgentName: 'bParentAgentName',  // 所属渠道名

      agentType: 'agentType', // 商户类型

      state: 'doStatus', // 审核状态

      address: 'bAddress', // 渠道详细地址
      email: 'bEmail', // 联系邮箱
      leader: 'bLeader', // 负责人姓名
      leaderPhone: 'bPhone', // 负责人手机
      leaderIdCardUrl: 'bLeaderIdUrl',  // 负责人身份证正面、反面照片

      created: 'created',
      comment: 'bComment',  // 备注
      tags: 'bTag', // 标签

      bLicenceUrl: 'bLicenceUrl',  // 营业执照照片
      bLicenceCodeUrl: 'bLicenceCodeUrl',  // 营业执照代码照片（机构代码）

      bCardUrl: 'bCardUrl', // 银行卡照片


      aBank: 'aBank', // 开户银行号
      bankCardNum: 'aCard', // 银行卡号
      bankCardAuthor: 'aCardAuthor',  // 开户人姓名
      bankCardType: 'aCardType',  // 银行卡账户类型
      bankCardProvince: 'aCardProvince',  // 开户省份
      bankCardCity: 'aCardCity',  // 开户城市
      bankCardSubBank: 'aCardBank', // 开户分行名
      bankCardSubBankNum: 'aCardBankNumber',  // 网点号
      bankCardCredentialType: 'aCredentialType',  // 证件类型
      bankCardCredentialNum: 'aCredentialNumber', // 证件号码
      bankCardCredentialPhone: 'aCredentialPhone',  // 手机号码
      bankCardIsSelf: 'aCardBankIsSelf',  // 是否为行内账号
    }],
  },
  current: 'pageNum',
  pageSize: 'pageSize',
  total: 'total',
}

export default {
  agentSend,
  agentGet,
}
