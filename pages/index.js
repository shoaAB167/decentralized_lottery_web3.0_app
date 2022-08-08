import React ,{Component} from 'react';
import lottery from '../lottery';
import web3 from '../web3';


class Lottery extends Component {

  constructor(props){
    super(props);
    this.state = {
      manager : '',
      participate_amount : '0.00001',
      message : '',
      total_amount : '',
      message : ''
      //it help to give what happening with smart contract
   }
  }
  //it take all the info and mounted to the view of react app
  async componentDidMount(){
    //get the public address of manager
    const manager = await lottery.methods.manager().call();
    //manager method call from lottery.js ABI
    //basically clicking manager button
    console.log(manager);
    this.setState({manager : manager});
    //web3 connect with lottery app and get the balance of smart contract
    //lottery.option.address is adress where contract is deployed (ABI code)
    const total_amount = await web3.eth.getBalance(lottery.options.address);
    this.setState({total_amount : total_amount});
  }

  onSubmit = async (event) => {
    event.preventDefault();//it allows browser not refresh or jump
    const accounts = await web3.eth.getAccounts();

    if(this.state.participate_amount < 0.000001){
      return alert("Amount is less than 0.000001, Please enter bigger amount");
    }

    this.setState({message : 'Please wait ...'});
    const enter_lottery = await lottery.methods.enterLottery().send({
      from : accounts[0] ,//we select second account from metamask
      value : web3.utils.toWei(this.state.participate_amount, 'ether')//convert ether to wei
    });
    this.setState({message: "You have been added to the Lottery!"});
  }

  render(){
    return(
    <div>
      <h1> Total lottery pool is {web3.utils.fromWei(this.state.total_amount,'ether')} </h1>
      <form onSubmit = {this.onSubmit}>
      <input value = {this.state.participate_amount} onChange = {event => this.setState({
      participate_amount : event.target.value})} />
      <button type = "submit">Participate</button>
      </form>
      <p>{this.state.message}</p>
      <hr/> <br/> <hr/>
      <p> The manager of the lottery decentralized app is {this.state.manager} </p>
      <button>Pick Winner</button>
    </div>
    )
  }
}

export default Lottery;
