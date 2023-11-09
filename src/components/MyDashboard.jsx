// 
// 
import ImagesSection from "./ImagesSection"
import TranscriptionsSection from "./TranscriptionsSection"
import DocumentsList from "./DocumentsList"

 function MyDashboard(){
    const documents = 
    [
        {
          "pk": 1,
          "images": [
            {
              "num": "1",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/1/img253.jpg",
              "name": "img253.jpg"
            },
            {
              "num": "2",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/1/img254.jpg",
              "name": "img254.jpg"
            },
            {
              "num": "3",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/1/img255.jpg",
              "name": "img255.jpg"
            },
            {
              "num": "4",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/1/img256.jpg",
              "name": "img256.jpg"
            }
          ],
          "transcrption": {
            "id": "COPIES Title - deeds OTHERS/1",
            "area": "254.2",
            "regno": "162/2 161/3 161/4 172/3 173/1",
            "person": "MOHAMOOD MOHAMED EMAN"
          },
          "name_of_document": "COPIES Title - deeds OTHERS/1/MOHAMOOD MOHAMED EMAN/254.2"
        },
        {
          "pk": 1,
          "images": [
            {
              "num": "1",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/1/img253.jpg",
              "name": "img253.jpg"
            },
            {
              "num": "2",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/1/img254.jpg",
              "name": "img254.jpg"
            },
            {
              "num": "3",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/1/img255.jpg",
              "name": "img255.jpg"
            },
            {
              "num": "4",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/1/img256.jpg",
              "name": "img256.jpg"
            }
          ],
          "transcrption": {
            "id": "COPIES Title - deeds OTHERS/1",
            "area": "254.2",
            "regno": "162/2 161/3 161/4 172/3 173/1",
            "person": "MOHAMOOD MOHAMED EMAN"
          },
          "name_of_document": "COPIES Title - deeds OTHERS/1/MOHAMOOD MOHAMED EMAN/254.2"
        },
        {
          "pk": 1,
          "images": [
            {
              "num": "1",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/1/img253.jpg",
              "name": "img253.jpg"
            },
            {
              "num": "2",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/1/img254.jpg",
              "name": "img254.jpg"
            },
            {
              "num": "3",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/1/img255.jpg",
              "name": "img255.jpg"
            },
            {
              "num": "4",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/1/img256.jpg",
              "name": "img256.jpg"
            }
          ],
          "transcrption": {
            "id": "COPIES Title - deeds OTHERS/1",
            "area": "254.2",
            "regno": "162/2 161/3 161/4 172/3 173/1",
            "person": "MOHAMOOD MOHAMED EMAN"
          },
          "name_of_document": "COPIES Title - deeds OTHERS/1/MOHAMOOD MOHAMED EMAN/254.2"
        },
        {
          "pk": 1,
          "images": [
            {
              "num": "1",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/1/img253.jpg",
              "name": "img253.jpg"
            },
            {
              "num": "2",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/1/img254.jpg",
              "name": "img254.jpg"
            },
            {
              "num": "3",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/1/img255.jpg",
              "name": "img255.jpg"
            },
            {
              "num": "4",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/1/img256.jpg",
              "name": "img256.jpg"
            }
          ],
          "transcrption": {
            "id": "COPIES Title - deeds OTHERS/1",
            "area": "254.2",
            "regno": "162/2 161/3 161/4 172/3 173/1",
            "person": "MOHAMOOD MOHAMED EMAN"
          },
          "name_of_document": "COPIES Title - deeds OTHERS/1/MOHAMOOD MOHAMED EMAN/254.2"
        },
        {
          "pk": 2,
          "images": [
            {
              "num": "1",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/10/img182.jpg",
              "name": "img182.jpg"
            }
          ],
          "transcrption": {
            "id": "COPIES Title - deeds OTHERS/10",
            "area": "0.047",
            "regno": "3",
            "person": "LOISE WAITHIRA WARUI"
          },
          "name_of_document": "COPIES Title - deeds OTHERS/10/LOISE WAITHIRA WARUI/0.047"
        },
        {
          "pk": 3,
          "images": [
            {
              "num": "1",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/11/img185.jpg",
              "name": "img185.jpg"
            },
            {
              "num": "2",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/11/img186.jpg",
              "name": "img186.jpg"
            },
            {
              "num": "3",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/11/img187.jpg",
              "name": "img187.jpg"
            },
            {
              "num": "4",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/11/img188.jpg",
              "name": "img188.jpg"
            }
          ],
          "transcrption": {
            "id": "COPIES Title - deeds OTHERS/11",
            "area": "4.1",
            "regno": "6",
            "person": "GRACE WANJIKU GACHUGU"
          },
          "name_of_document": "COPIES Title - deeds OTHERS/11/GRACE WANJIKU GACHUGU/4.1"
        },
        {
          "pk": 3,
          "images": [
            {
              "num": "1",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/11/img185.jpg",
              "name": "img185.jpg"
            },
            {
              "num": "2",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/11/img186.jpg",
              "name": "img186.jpg"
            },
            {
              "num": "3",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/11/img187.jpg",
              "name": "img187.jpg"
            },
            {
              "num": "4",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/11/img188.jpg",
              "name": "img188.jpg"
            }
          ],
          "transcrption": {
            "id": "COPIES Title - deeds OTHERS/11",
            "area": "4.1",
            "regno": "6",
            "person": "GRACE WANJIKU GACHUGU"
          },
          "name_of_document": "COPIES Title - deeds OTHERS/11/GRACE WANJIKU GACHUGU/4.1"
        },
        {
          "pk": 3,
          "images": [
            {
              "num": "1",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/11/img185.jpg",
              "name": "img185.jpg"
            },
            {
              "num": "2",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/11/img186.jpg",
              "name": "img186.jpg"
            },
            {
              "num": "3",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/11/img187.jpg",
              "name": "img187.jpg"
            },
            {
              "num": "4",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/11/img188.jpg",
              "name": "img188.jpg"
            }
          ],
          "transcrption": {
            "id": "COPIES Title - deeds OTHERS/11",
            "area": "4.1",
            "regno": "6",
            "person": "GRACE WANJIKU GACHUGU"
          },
          "name_of_document": "COPIES Title - deeds OTHERS/11/GRACE WANJIKU GACHUGU/4.1"
        },
        {
          "pk": 3,
          "images": [
            {
              "num": "1",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/11/img185.jpg",
              "name": "img185.jpg"
            },
            {
              "num": "2",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/11/img186.jpg",
              "name": "img186.jpg"
            },
            {
              "num": "3",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/11/img187.jpg",
              "name": "img187.jpg"
            },
            {
              "num": "4",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/11/img188.jpg",
              "name": "img188.jpg"
            }
          ],
          "transcrption": {
            "id": "COPIES Title - deeds OTHERS/11",
            "area": "4.1",
            "regno": "6",
            "person": "GRACE WANJIKU GACHUGU"
          },
          "name_of_document": "COPIES Title - deeds OTHERS/11/GRACE WANJIKU GACHUGU/4.1"
        },
        {
          "pk": 4,
          "images": [
            {
              "num": "1",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/12/img189.jpg",
              "name": "img189.jpg"
            },
            {
              "num": "2",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/12/img190.jpg",
              "name": "img190.jpg"
            },
            {
              "num": "3",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/12/img191.jpg",
              "name": "img191.jpg"
            }
          ],
          "transcrption": {
            "id": "COPIES Title - deeds OTHERS/12",
            "area": "0.03",
            "regno": "5",
            "person": "ATANAS KAMAU MWANGI"
          },
          "name_of_document": "COPIES Title - deeds OTHERS/12/ATANAS KAMAU MWANGI/0.03"
        }
    ]

    return (
        <>
            <div className='body--section'>
                <div className='side-panel'>
                  <DocumentsList documnets_data={documents.name_of_document}/>
                </div>
                {/* <div className='main-section'>
                    <ImagesSection documnets_data={documents.name_of_document}/>
                    <TranscriptionsSection documnets_data={documents.name_of_document}/>
                </div> */}
            </div>
        </>
    )
 }

 export default MyDashboard