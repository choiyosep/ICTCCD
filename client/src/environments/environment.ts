export const environment = {
  production: false,
  // API_ENDPOINT: 'http://175.195.197.180:3000/',
  // API_ENDPOINT: 'http://192.168.219.102:3000/',

  //web
  API_ENDPOINT: 'http://localhost:8100/api/',
  //mobile

  // API_ENDPOINT: 'http://192.168.43.77:3000/',

  AWS:{

    REGION :"ap-northeast-2",

    S3: {
      BUCKET_NAME: "soborrow",
      FILE_URL: 'https://soborrow2.s3.ap-northeast-2.amazonaws.com/',
    }
  },






  _POOL_DATA : {
    UserPoolId: "ap-northeast-2_AcVZp4GhT",
    ClientId: "2n2l5jvqvbg2vbqhf32df9lkk8",
    region: 'ap-northeast-2',
  }
};
