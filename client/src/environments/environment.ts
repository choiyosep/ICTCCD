export const environment = {
  production: false,
  // API_ENDPOINT: 'http://192.168.0.101:3000/',
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
    UserPoolId: "ap-northeast-2_2FNqQpToV",
    ClientId: "17mvqqbsnj8lf3psl7k0q8fnq5",
    region: 'ap-northeast-2',
  }
};
