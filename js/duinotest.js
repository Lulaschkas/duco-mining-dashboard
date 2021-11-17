const app = Vue.createApp({
    data(){
        return{
            list: "column",
            colorstyle: {
                "background-color": "",
            },
            items: [
              { name: 'active', },
              { name: 'not', },
              { name: 'not', },
              { name: 'not', },
              { name: 'not', },
              { name: 'not', },
              { name: 'not', },
            ],

            "1": "circle",
            counter: 0,
            ergebniss: [
                { value: 'unknown', },
                { value: 'unknown', },
                { value: 'unknown', },
                { value: 'unknown', },
                { value: 'unknown', },
                { value: 'unknown', },
                { value: 'unknown', },
              ],
            questionfour: "Are you interested in learning more about Microcontrollers and programming?",
            final: 0,
            finalwords: "undefined"
        }
    },
    created(){

        
    },
    methods:{
        fillbackground(counter){
            setTimeout(()=>{
            if(this.ergebniss[counter]=="yes"){
                this.colorstyle["background-color"] = "rgba(76, 240, 0, 0.188)";
            }
            else if(this.ergebniss[counter]=="no"){
                this.colorstyle["background-color"] = "rgba(0, 115, 255, 0.188)";
            }
            else{
                this.colorstyle["background-color"] = "rgba(255, 255, 255, 0.7)";
            }
            }, 600);
        },
        previous(){
            counter = this.counter
            if(counter>0){
                this.items[counter]["name"]="unactive";
                counter--;
                this.fillbackground(counter)
                this.items[counter]["name"]="active";
            }

            this.counter = counter;
        },
        next(){
            counter = this.counter
            if(counter<this.items.length-1){
                this.items[counter]["name"]="unactive";
                counter++;
                this.items[counter]["name"]="active";
                this.fillbackground(counter)
            }
            if(this.counter==5){
                let i =0;
                var finalvalue = 0;
                this.ergebniss.forEach(element => {
                    switch(i){
                        case 0:
                            if(element == "yes"){
                                finalvalue += 20;
                            }
                            else if(element == "no"){
                                
                            }
                            break;
                        case 1:
                            if(element == "yes"){
                                
                            }
                            else if(element == "no"){
                               finalvalue+=25; 
                            }
                            break;
                        case 2:
                            if(element == "yes"){
                                finalvalue+=10; 
                            }
                            else if(element == "no"){
                                
                            }
                            break;
                        case 3:
                            if(element == "yes"){
                                finalvalue+=20; 
                            }
                            else if(element == "no"){
                                
                            }
                            break;
                        case 4:
                            if(element == "yes"){
                            }
                            else if(element == "no"){
                                finalvalue+=15; 
                            }
                            break;
                        case 5:
                            if(element == "yes"){
                            }
                            else if(element == "no"){
                                finalvalue+=10; 
                            }
                            break;
                        default:
                            break;
                    }

                    i++;
                });

                this.final = finalvalue;
                if(finalvalue>=90){
                    this.finalwords="Wow, from what you answered it seems like Duino-Coin might really be a thing for you."
                }
                else if(finalvalue>=80){
                    this.finalwords="It looks like Duino-Coin might be something for you. You can give it a try!"
                }
                else if(finalvalue>=60){
                    this.finalwords="Duino-Coin COULD be something for you, but maybe it also isn't and other currencies fit you more."
                }
                else{
                    this.finalwords="Duino-Coin propably is nothing for you. But thats no problem, you could take a look at other low power digital-currencies."
 
                }
            }
            this.counter = counter;
            
        },
        yes(){
            setTimeout(()=>{this.colorstyle["background-color"] = "rgba(76, 240, 0, 0.188)";}, 10);
            setTimeout(()=>{this.colorstyle["background-color"] = "rgba(255, 255, 255, 0.7)";}, 500);
            this.ergebniss[this.counter] = "yes";
            this.next();
            this.interactivequestion(true);

        },
        no(){
            setTimeout(()=>{this.colorstyle["background-color"] = "rgba(0, 115, 255, 0.188)";}, 10);
            setTimeout(()=>{this.colorstyle["background-color"] = "rgba(255, 255, 255, 0.7)";}, 500);
            this.ergebniss[this.counter] = "no";
            this.next();
            this.interactivequestion(false);
        },
        interactivequestion(ergebnis){
            switch(this.counter){
                case 3:
                    if(ergebnis){
                        this.questionfour = "Do you want to build own Software for Duino-Coin? (Miners, websites, modify code etc.)";
                    }
                    else{
                        this.questionfour = "Are you interested in learning more about Microcontrollers and programming?";
                    }
            }
        }
    }
})
app.mount('#fixes');