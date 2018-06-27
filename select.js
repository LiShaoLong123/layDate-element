Vue.component('check-select', {
    props:['data','pass_value'],
    data:function(){
        return{
            checked:false
        }
    },
    methods:{
        //选择全部
        selectAll:function(e){
            var all_checked=document.querySelector("#all_checked");
            this.checked=!this.checked;
            console.log(this.checked);
            var that=this;
            if(this.checked){
                this.$nextTick(function(){
                    that.pass_value(that.findCheckTrue());
                })                   
            }
        },
        //找出选中项
        findCheckTrue:function(){
            var allInput=document.querySelectorAll("#wrap_move_div input");
            var all_checked=document.querySelector("#all_checked");
            var allValue=[];
            this.for_click.innerHTML="";
            allInput.forEach(function(element) {
                if(element.checked&&element.id!=='all_checked'){
                    this.for_click.innerHTML+=element.nextElementSibling.innerHTML+",";
                    allValue.push(element.value);
                }
            }, this);
            return allValue;
        },
        //单一选项
        selectOne:function(e){
           this.pass_value(this.findCheckTrue());
        },
        //显示下拉
        showList:function(e){
            e.stopPropagation()
            var node= e.target.nextElementSibling;
            if(node===null)return;
            if(node.style.display==="inline-block"){
                node.style.display="none";
                document.querySelector(".select-icon").classList.remove('select-icon-rotate');
            }else{
                node.style.display="inline-block";
                document.querySelector(".select-icon").classList.add('select-icon-rotate');
            }
        },
        stopPropagation:function(e){
            e.stopPropagation();
        }
    },
    watch:{
        data:function(){
             document.querySelector(".for_click").innerHTML="";
             this.checked=false;
        } 
    },
    mounted:function(){
        //隐藏 
       document.querySelector("body").onclick=function(){
            document.getElementById("wrap_move_div").style.display="none";
            document.querySelector(".select-icon").classList.remove('select-icon-rotate');
       }
       this.for_click=document.querySelector(".for_click");
    },
    template:'<div id="wrap_select" >'+
             ' <span class="el-input__suffix" style="top:3px;"><span class="el-input__suffix-inner"><i class="el-select__caret el-input__icon el-icon-arrow-up select-icon"></i></span></span>'+
            '  <div class="for_click" @click="showList"></div>'+
            '  <div id="wrap_move_div" @click="stopPropagation">'+
            '   <div>'+
            '     <input :checked="checked" type="checkbox" id="all_checked" value="全部" @change="selectAll"/><label class="wrap_move_div_label" for="all_checked">全选</label>'+
            '   </div>'+ 
            '   <div  v-for="item in data">'+
            '     <input @change="selectOne" :checked="checked" type="checkbox" :id="item.key" :value="item.key"/><label class="wrap_move_div_label" :for="item.key">{{item.value}}</label>'+
            '   </div>'+
            '  </div>'+
            '</div>'

})                                                                                                                                                                                                                        