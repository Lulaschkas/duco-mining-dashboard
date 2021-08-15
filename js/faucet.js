//this is the JS code to control and connect to the faucet.
const app = Vue.createApp({
    data(){
        return{
            items: [],
            faucetimage: 'img/faucet.gif',
            faucetinput: 'input is-success is-rounded',
            imagestyle: {
                width: "100%",
            },
            faucetpopup:{
                display: "none",
            }
        }
    },
    methods:{
        startfaucet() {
            if(this.tos == true){
                const getCookieValue = (name) => (
                    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
                  )
                if(getCookieValue("cookiesaccepted")=="true"){
                    this.items=[];
                    this.faucetpopup.display = "block";
                }
                else{
                    this.items[0] = "Sorry, but we can't serve the faucet without your permission to save cookies."
                    return 0;
                }
            }
            else{
                this.items[0] = "Please read and accept the Terms of service to continue";
            }

        },
        submitsolution() {


            let response = grecaptcha.getResponse();
            this.faucetpopup.display = "none"
            this.items = [];
            this.faucetimage = 'img/Settings.gif'
            this.imagestyle.width = "100px"
            this.items.push("Please wait, accessing the server can take up to 120 seconds.");
            this.ducoexplorer = "";
            fetch("/faucet.php?username=" + this.username + "&solution=" + this.solution + "&captcha=" + response)
            .then(response => response.text())
            .then((response)=>{
                console.log(response);
                let serverre = response.split("+")
                if(serverre[0]=="DONE"){
                    this.faucetimage = 'img/check.png'
                    this.items = [];
                    this.items.push("Ok, we have sent " + validate(serverre[1]) + " DUCO to your account.");
                    this.link = "https://explorer.duinocoin.com/?search=" + validate(serverre[2]);
                    this.ducoexplorer = "see the transaction on DUCO explorer";

                }
                else{
                    this.items = [];
                    this.faucetimage = 'img/error.png'
                    this.items.push("An error occured!");
                    this.items.push("Server response: " + validate(serverre[1]));
                }
            })
        },
        solutionclose(){
            this.faucetpopup.display = "none"

        }
    }
})
app.mount('#vueappfaucet');