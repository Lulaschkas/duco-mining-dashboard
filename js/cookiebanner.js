//this is the JS code used to show the cookiebanner and manage cookies
const app2 = Vue.createApp({
    data(){
        return{
            banner:{
                display: "none",
            },
        }
    },
    created(){
        const getCookieValue = (name) => (
            document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
          )
        if(getCookieValue("cookiesaccepted")=="true" || getCookieValue("cookiesaccepted")=="false"){
            this.banner.display = "none"
        }
        else{
            this.banner.display = "block"

        }
        
    },
    methods:{
        reject() {
            var expires = "";
            var date = new Date();
            date.setTime(date.getTime() + (30*24*60*60*1000)); //30 days cookie storage
            expires = "; expires=" + date.toUTCString();
            document.cookie = "cookiesaccepted=false" + expires + "; path=/";
            document.cookie = "PHPSESSID= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
            this.banner.display = "none"
            location.reload(); 


        },
        accept() {
            var expires = "";
            var date = new Date();
            date.setTime(date.getTime() + (30*24*60*60*1000)); //30 days cookie storage
            expires = "; expires=" + date.toUTCString();
            document.cookie = "cookiesaccepted=true" + expires + "; path=/";
            this.banner.display = "none"
            location.reload(); 
        },
        show(){
            this.banner.display = "block"

        }
    }
})
app2.mount('#vuecookiebanner');