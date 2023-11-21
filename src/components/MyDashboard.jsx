// 
// 
import DocumentsList from "./DocumentsList"
import TranscriptionsSection from "./TranscriptionsSection"
import ImagesSection from "./ImagesSection"

 function MyDashboard(){
    const documents = 
    [
        {
          "pk": 1,
          "images": [
            {
              "num": "1",
              "url": "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img254.jpg",
              "name": "img253.jpg"
            },
            {
              "num": "2",
              "url": "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img254.jpg",
              "name": "img254.jpg"
            },
            {
              "num": "3",
              "url": "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img254.jpg",
              "name": "img255.jpg"
            },
            {
              "num": "4",
              "url": "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img254.jpg",
              "name": "img256.jpg"
            }
          ],
          "transcription": {
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
              "url": "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img254.jpg",
              "name": "img253.jpg"
            },
            {
              "num": "2",
              "url": "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img254.jpg",
              "name": "img254.jpg"
            },
            {
              "num": "3",
              "url": "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img254.jpg",
              "name": "img255.jpg"
            },
            {
              "num": "4",
              "url": "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img254.jpg",
              "name": "img256.jpg"
            }
          ],
          "transcription": {
            "id": "COPIES Title - deeds OTHERS/1",
            "area": "254.2",
            "regno": "162/2 161/3 161/4 172/3 173/1",
            "person": "MOHAMOOD MOHAMED EMAN"
          },
          "name_of_document": "COPIES Title - deeds OTHERS/1/MOHAMOOD MOHAMED EMAN/254.2"
        },
        {
          "pk": 3,
          "images": [
            {
              "num": "1",
              "url": "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img254.jpg",
              "name": "img253.jpg"
            },
            {
              "num": "2",
              "url": "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img254.jpg",
              "name": "img254.jpg"
            },
            {
              "num": "3",
              "url": "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img254.jpg",
              "name": "img255.jpg"
            },
            {
              "num": "4",
              "url": "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img254.jpg",
              "name": "img256.jpg"
            }
          ],
          "transcription": {
            "id": "COPIES Title - deeds OTHERS/1",
            "area": "254.2",
            "regno": "162/2 161/3 161/4 172/3 173/1",
            "person": "MOHAMOOD MOHAMED EMAN"
          },
          "name_of_document": "COPIES Title - deeds OTHERS/1/MOHAMOOD MOHAMED EMAN/254.2"
        },
        {
          "pk": 4,
          "images": [
            {
              "num": "1",
              "url": "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img254.jpg",
              "name": "img253.jpg"
            },
            {
              "num": "2",
              "url": "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img254.jpg",
              "name": "img254.jpg"
            },
            {
              "num": "3",
              "url": "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img254.jpg",
              "name": "img255.jpg"
            },
            {
              "num": "4",
              "url": "https://dev.mutall.co.ke/mashamba/v/images/COPIES%20Title%20-%20deeds%20OTHERS/1/img254.jpg",
              "name": "img256.jpg"
            }
          ],
          "transcription": {
            "id": "COPIES Title - deeds OTHERS/1",
            "area": "254.2",
            "regno": "162/2 161/3 161/4 172/3 173/1",
            "person": "MOHAMOOD MOHAMED EMAN"
          },
          "name_of_document": "COPIES Title - deeds OTHERS/1/MOHAMOOD MOHAMED EMAN/254.2"
        },
        {
          "pk": 5,
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
          "transcription": {
            "id": "COPIES Title - deeds OTHERS/11",
            "area": "4.1",
            "regno": "6",
            "person": "GRACE WANJIKU GACHUGU"
          },
          "name_of_document": "COPIES Title - deeds OTHERS/11/GRACE WANJIKU GACHUGU/4.1"
        },
        {
          "pk": 6,
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
          "transcription": {
            "id": "COPIES Title - deeds OTHERS/11",
            "area": "4.1",
            "regno": "6",
            "person": "GRACE WANJIKU GACHUGU"
          },
          "name_of_document": "COPIES Title - deeds OTHERS/11/GRACE WANJIKU GACHUGU/4.1"
        },
        {
          "pk": 7,
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
          "transcription": {
            "id": "COPIES Title - deeds OTHERS/11",
            "area": "4.1",
            "regno": "6",
            "person": "GRACE WANJIKU GACHUGU"
          },
          "name_of_document": "COPIES Title - deeds OTHERS/11/GRACE WANJIKU GACHUGU/4.1"
        },
        {
          "pk": 8,
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
          "transcription": {
            "id": "COPIES Title - deeds OTHERS/12",
            "area": "0.03",
            "regno": "5",
            "person": "ATANAS KAMAU MWANGI"
          },
          "name_of_document": "COPIES Title - deeds OTHERS/12/ATANAS KAMAU MWANGI/0.03"
        },
        {
          "pk": 9,
          "images": [
            {
              "num": "1",
              "url": "/mashamba/v/images//COPIES Title - deeds OTHERS/10/img182.jpg",
              "name": "img182.jpg"
            }
          ],
          "transcription": {
            "id": "COPIES Title - deeds OTHERS/10",
            "area": "0.047",
            "regno": "3",
            "person": "LOISE WAITHIRA WARUI"
          },
          "name_of_document": "COPIES Title - deeds OTHERS/10/LOISE WAITHIRA WARUI/0.047"
        },
        {
          "pk": 10,
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
          "transcription": {
            "id": "COPIES Title - deeds OTHERS/11",
            "area": "4.1",
            "regno": "6",
            "person": "GRACE WANJIKU GACHUGU"
          },
          "name_of_document": "COPIES Title - deeds OTHERS/11/GRACE WANJIKU GACHUGU/4.1"
        }
    ]
    return (
        <>
            <div className='body--section'>
                <div className='side-panel'>
                  {documents.map((document, index) => (
                    <DocumentsList key={index} document={document}/>
                  ))};
                </div>
                <div className="main--section">
                  <div className="main--image_section">
                    {documents.map((document, index) => (
                      <ImagesSection key={index} images={document.images}/>
                    ))};
                  </div>
                  <div className="main--transcription_section">
                    {documents.map((document, index) => (
                      <TranscriptionsSection key={index} transcriptions={document.transcription}/>
                    ))};
                  </div>
                </div>
            </div>
        </>
    )
 }

 export default MyDashboard