# 떠리매처 

## ✔️ 서비스 소개
    위치기반 떨이상품 O2O판매 플랫폼

## ✔️ 개발 동기 및 목적
- 국내 음식물류 폐기물의 발생량은 매해 평균 5%이상 증가하는 추세입니다.

- 한편, 많은 마감 전 할인 식품이 매장에 방문하지 않는 이상 할인 유무를 알 수 없어 판매되지 못하고 버려지고 있습니다.

- 이러한 문제에 조금이나마 기여하기 위해 유통기한이 임박한 ‘떨이’ 상품을 처리해야 하는 상점주와, 식품의 품질보다는 가 성비를 중요하게 여기는 소비자들을 연결시켜주는 위치기반 O2O 판매 플랫폼인 ‘떠리매처’를 개발하게 되었습니다.

<br/>

## ✔️ 프로젝트 내용

- 판매자  
떨이상품 판매를 원하는 상점주 • 상점/상품 등록, 판매이력 조회

- 구매자  
떨이상품 구매를 원하는 소비자 • 상점/상품 조회, 장바구니 관리 및 결제, 구매이력 조회, 리뷰 작성 

- 위치기반 서비스  
사용자의 현재위치를 중심으로 탐색 500m/1km/3km 중 선택 가능

- PUSH 알림 서비스  
즐겨찾기된 상점에 새로운 상품이 등록된 경우 알림 서비스 제공

<br/>


## ✔️ 사용 기술 소개

<img src="https://user-images.githubusercontent.com/32871201/149610495-fc569560-0134-4c93-930d-bca943cc7b03.png" width="800" height="50%"/>


<br/>


- 시스템 구성은 사용자 인증을 담당하는 `Amazon Cognito`, 파일을 저장하는 공간인 `Amazon S3`, 클라이언트의 요청을 처리하고 응답하는 `Amazon EC2`, 데이터를 영구적으로 저 장하는 공간인 `Amazon RDS`로 이루어져 있습니다.

- 푸시 알림 전송이 필요한 경우에는 사용자 기기의 토큰값을 사용해 `Firebase`에 푸시 알림 메시지 전송을 요청합니다.

- `Naver Map API`에서는 지도와 위도/경도 정보를, `다음우편번호` 서비스에서는 주소 정보를 제공받아 사용합니다.


> 사용자는 Amazon Cognito에서 제공해주는 회원가입과 로그인 서비스 기능으로 사용자 인증을 거치면 서버와 통신할 수 있는 토큰을 발행받습니다. 앱은 Amazon 서버에게 http요청 시 요청 수행에 필요한 파라미터 값과 토큰 값을 전달합니다. 각 http요청은 유효한 토큰인지 인증을 거친 후 인증이 성공하면 Amazon EC2와 통신합니다. Amazon EC2는 필요 시, Amazon RDS에서 Create, Read, Update, Delete 기능을 수행하고 결과를 다시 http응답으로 사용자에게 json형태로 전달됩니다. 앱에 도착한 데이터는 사용자 화면에 표시되거나 다음 기능을 수행하는 데 사용됩니다.  

<br/>


## ✔️ 서비스 결과

<img width="1255" alt="image" src="https://user-images.githubusercontent.com/32871201/149611114-3fa0855c-f81b-4c39-adae-ac06f44eb4d0.png">


## ✔️ 기대 효과

**판매자 측면**  
자칫하면 버려질 수 있는 유통기한 임박 상품에 대한 수요 증가는 가게의 매출에 긍정적으로 작용합니다. 또한, 떠리매처 플랫폼을 통해 마케팅 ROI를 극대화할 수 있어 비용 감소 효과를 기대할 수 있습니다.

**소비자 측면**  
언제 어디서나 주변 할인 정보를 쉽고 빠르게 검색할 수 있으며, 즐겨찾기에 관심 매장을 등록하여 PUSH 알림을 통해 할인 정보를 제공받을 수 있으므로 서비스 만족도가 크게 증가할 것입니다. 그 뿐만 아니라 같은 식품을 보다 저렴한 가격에 구매하는 합리적인 소비를 통해 식비를 절감할 수 있게됩니다.