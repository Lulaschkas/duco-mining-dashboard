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
            },
            transactions: "loading...",
            users: "loading...",
            balance: "loading...",
            donator: "loading...",
            last: "loading..."
        }
    },
    methods:{
        updatefaucetstats() {
            fetch("/faucetinfo.json")
            .then(response => response.json())
            .then((response)=>{
                this.transactions = validate(String(response["transactions"]));
                this.balance = Math.round(String(response["faucet_balance"]*100)/100) + " ᕲ";
                this.users = validate(String(response["individual_users"]));
                this.last =  "'" + validate(response["last_user"])+  "'" + " got " + validate(String(response["last_coins"])) + " ᕲ";
                let lastelement=[];
                for (const [key, value] of Object.entries(response["donators"])) {
                    if(value["time"]>lastelement["time"]){
                        var lastdonator = key;
                        var lastdonatorduco = value["duco"];
                    }
                    lastelement = value;
                };
                this.donator = "'" + validate(lastdonator) + "'" + " donated " + validate(String(lastdonatorduco)) + " ᕲ";

            })
        },
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
                let serverre = response.split("+")
                if(serverre[0]=="DONE"){
                    this.faucetimage = 'img/check.png'
                    this.items = [];
                    this.items.push("Ok, we have sent " + validate(serverre[1]) + " DUCO to your account.");
                    this.link = "https://explorer.duinocoin.com/?search=" + validate(serverre[2]);
                    this.ducoexplorer = "see the transaction on DUCO explorer";
                    hcaptcha.reset();
                    this.updatefaucetstats();
                }
                else{
                    this.items = [];
                    this.faucetimage = 'img/error.png'
                    this.items.push("An error occured!");
                    this.items.push("Server response: " + validate(serverre[1]));
                    hcaptcha.reset();
                }
            })
        },
        solutionclose(){
            this.faucetpopup.display = "none"

        }
    },
    created(){
        this.updatefaucetstats();
        setInterval(()=>this.updatefaucetstats(), 5000);
    },
})
app.mount('#vueappfaucet');