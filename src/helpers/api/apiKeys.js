const apiKeys = {
  //registration
  businessRegistration: "talent/business/registration",
  individualRegistration: "talent/individual/registration",

  //login

  //client
  getTalentProposalJob: 'client/talentjob/proposal',
  getProposalJob: 'client/job/proposal',
  talentDetails: 'client/talent/details',//get

  //
  userLogin: "talent/user/login",

  //password reset
  lostPasswordOtpSent: "talent/lostPassword/otpsent",
  lostPasswordOtpVerify: "talent/lostPassword/otpverify",
  resetPassword: "talent/resetPassword",

  //change password
  changePassword: "change/password",

  //update device token
  deviceToken: "talent/user/update",

  //profile
  getProfileDetails: "user/details",
  updateTalentProfile: "talent/user/update",
  addSkills: "talent/add/skill",
  addServices: "talent/add/service",
  getSkillsDetails: "talent/skill/detail",
  getServicesDetails: "talent/service/detail",

  //email
  sendOTP: "verify/email",
  verifyOTP: "verify/otp",
  mobileEmail: "verify/mobemail",

  //jobs
  
  allJobs: "skill/exclude/job",
  jobCorrSkills: "skill/corresponding/job",
  searchJob: "job/list",
  postJobProposal: "talent/proposal/job",
  getActiveJobs: "talent/activeJobandContract",
  getPastJobs: "talent/pastJobandContract",
  getCity:"city/filter",

  
   //top rated talents
   topRatedTalents: "talent/top/rating",
  //ratings
  createRating: "common/rating/create",
  getRating: "common/rating/get",

  //chat
  acceptProposalJobs: "talent/proposal/accept",

  //proposal
  talentproposalStatus: "talent/proposal/status",

  //notification
  getNotification: "talent/get_notification_list/",
  getAdminPercentage: "admin/percentage",

  //contracts
  getContractList: "talent/talent_contract_list",
  updateContractStatus: "talent/update_contract_status",
  getContractDetail: "talent/get_contract_details",

  //payment-methods
  getPaymentLink: "talent/account/create",
  getUrl: "talent/account/linkgenerate",
  getAccountDetails: "talent/account/details",

  //payment status
  paymentList: 'talent/payment/status',

  //admin services
  getAdminServices: "admin/services",

  //feeds
  getFeed: "feed/list",

  //report
  supportList: "support/topic/list",
  supportPostReport: "support/ticket/initiate",

  //help and support
  supportTicketList: "support/ticket/list", //get
  supportChatInitiate: "support/ticket/chat/initiate", //post
  getSupportChat: "support/ticket/chat/list",

  //portfolio
  uploadData: "talent/portfolio/created", //post
  getUploadData: "talent/portfolio/retrieve", //get
  searchUser: "user/search", //get


   
  
  ///////////////////
  
};

export default apiKeys;
