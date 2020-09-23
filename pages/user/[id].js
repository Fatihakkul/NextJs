import Axios from 'axios'
import secretkey from '../secretKey'
function User({ user }){
    return(
        <div>
            <h1>{user.name}</h1>
        </div>
    )
}
export async function getStaticPaths() {
    const res = await Axios.get(
        `https://api.jsonbin.io/e/collection/5f6a90b27243cd7e8241a876/all-bins`,
        {
          headers: {
            "secret-key":
             secretkey,
          },
        }
      );
      const users = res.data.records;
    
    return {
      paths: users.map((use)=>{
          return {params  : { id : use.id}}
      }),
      fallback: false
    };
  }
export async function getStaticProps({params}) {
    console.log("selam");
    const res = await Axios.get(
      `https://api.jsonbin.io/b/${params.id}`,
      {
        headers: {
          "secret-key":
            secretkey,
        },
      }
    );
  
      const user = res.data
    
    return {
      props: {
        user
      },
    };
  }
export default User