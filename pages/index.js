import React, { useState } from "react";
import unfetch from "isomorphic-unfetch";
import Link from "next/link";
import Axios from "axios";
import styles from "./index.module.css";

function HomePage({ user }) {
  
  const [userName,setUserName]=useState('')
  const [userNumber,setUserNumber]=useState('')
  const [userRole,setUserRole]=useState('')

  const [userList, setUserList] = useState([]);
  
  async function getClientRender() {
    let list = [];
    for (let i = 0; i < user.length; i++) {
      const element = user[i];
      console.log(element);
      let res = await Axios.get(`https://api.jsonbin.io/b/${element.id}`, {
        headers: {
          "secret-key":
            "$2b$10$WS6tmgDo3UejFF/2zWriU.WPsdAGq1BWkEVd6YyNFlZgmUNRWDoHa",
        },
      });
      let users = { name: res.data.name, id: element.id , role : res.data.role , number : res.data.number};
      list.push(users);
    }
    setUserList(list);
    console.log(userList);
  }

  async function post() {
    console.log(userName + " " + userNumber + " " + userRole)
    let res = await Axios.post(
      `https://api.jsonbin.io/b`,
      {
        name: userName,
        number : userNumber,
        role : userRole
      },
      {
        headers: {
          "secret-key":
            "$2b$10$WS6tmgDo3UejFF/2zWriU.WPsdAGq1BWkEVd6YyNFlZgmUNRWDoHa",
          "collection-id": "5f6a90b27243cd7e8241a876",
        },
      }
    );
    console.log(res);
   
  }
  
  return (
    <div className={styles.container}>
      Welcome to Next.js!
      <button className={styles.updateButton} onClick={() => getClientRender()}>
        <text style={{ color: "white" }}>Listeyi güncelle</text>
      </button>
     
      <div className={styles.listDiv}>
        <div className={styles.list}>
           {userList.length > 0 ? userList.map((use, index) => {
             console.log(use)
            return (
              <div className={styles.listCont}>
                <h1>{use.name}</h1>
                <h3>{use.role}</h3>
                <h3>{use.number}</h3>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button className={styles.infoButton}>
                    <Link href="/user/[id]" as={`/user/${use.id}`}>
                      <a style={{color : 'white' }}>Detay görüntüle</a>
                    </Link>
                  </button>
                </div>
              </div>
            );
          })
          :
          null
        }
        
        </div>
        <div style={{  display : 'flex',flexDirection : 'column' , justifyContent : 'space-around'}}>
            <input placeholder="isim" value={userName} onChange={(e)=>setUserName(e.target.value)} />
            <input placeholder="telefon numarası" value={userNumber} onChange={(e)=>setUserNumber(e.target.value)}/>
            <input placeholder="rol" value={userRole} onChange={(e)=>setUserRole(e.target.value)}/>
            <button onClick={()=>post()}>Kullanıcı Kaydet</button>
        </div>
      </div>
      
    </div>
  );
}

//collections 5f6a90b27243cd7e8241a876
export async function getServerSideProps() {
  console.log("selam");
  const res = await Axios.get(
    `https://api.jsonbin.io/e/collection/5f6a90b27243cd7e8241a876/all-bins`,
    {
      headers: {
        "secret-key":
          "$2b$10$WS6tmgDo3UejFF/2zWriU.WPsdAGq1BWkEVd6YyNFlZgmUNRWDoHa",
      },
    }
  );
  const user = res.data.records;
  return {
    props: {
      user,
    },
  };
}
export default HomePage;
//KULLANICILARIn İSİMLERİNİ İNDEX.JS DE LİSTELEMEK İÇİN 43. SATIRDAKİ ÇAĞRIDAN DÖNEN İDLERİ FOR DÖNGÜSÜNE ALIP TEKRAR TEKRAR USER DATALARI ÇEKMEM GEREKİYOR
//SORUN ŞU ALL-BİNS BANA SADECE BİNSLERİN İDLERİNİ DÖNÜYOR
/* 

  


*/