import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Header from "./componets/Header";
import Footer from './componets/Footer';
import Settings from "./componets/Settings";
import mp3 from './audio/2e371cbd1ce9be1.mp3'
import mp3Win from './audio/win.wav'
//Объявляем state
const initialState = {
  fields: [
    {
      id: 0,
      value: null
    },
    {
      id: 1,
      value: null
    },
    {
      id: 2,
      value: null
    },
    {
      id: 3,
      value: null
    },
    {
      id: 4,
      value: null
    },
    {
      id: 5,
      value: null
    },
    {
      id: 6,
      value: null
    },
    {
      id: 7,
      value: null
    },
    {
      id: 8,
      value: null
    },
    
  ],
  count: 0,
  xLength: 0,
  oLength: 0,
  winMessage: '',
  winner: false,
  sound: true,
  isYourCross: true,
  isShowScore: true

};

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
    //Выиграшные комбинации
    this.winVariants = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [0,4,8],
    [2,4,6]
    ]

  }
  audio = new Audio(mp3)
  audioWin = new Audio(mp3Win)
  //Проверяем ход на выигрыш
  checkWinner = () =>{
    let checkValue;
    if(this.state.isYourCross){
      checkValue = this.state.count % 2 == 0 ? 'X' : '0';
    } else{
      checkValue = this.state.count % 2 == 0 ? '0' : 'X';
    }

    for(let i = 0; i < this.winVariants.length; i++){
      let line =  this.winVariants[i]
      if(this.state.fields[line[0]].value == checkValue &&
        this.state.fields[line[1]].value == checkValue &&
        this.state.fields[line[2]].value == checkValue 
        ){
          this.setState({winMessage: checkValue + ' won the game'})
          this.setState({winner: true})
          if(this.state.sound){
            this.audioWin.play()
          }
        setTimeout(this.restartGame, 2000)
      }
    }
  }

  //Наш ход по клику
  clickHander = fieldId =>{
    let newFields = this.state.fields
    this.setState({count: this.state.count + 1})
    if(newFields[fieldId].value  === null){
         // const newValue = this.state.count % 2 == 0 ? 'X' : '0';
          let newValue
          if(this.state.isYourCross){
            newValue = 'X';
            this.setState({xLength: this.state.xLength +1})
          } else{
            newValue = '0';
            this.setState({oLength: this.state.oLength +1})
          }

          newFields[fieldId].value = newValue;
          this.setState({fields: newFields})
        this.checkWinner()
        if(this.state.sound){
          this.audio.play()
        }
        setTimeout(this.enemyStep, 500)
    }

  }
  //Ход противника
  enemyStep = () =>{
    if(!this.state.winner){
     this.setState({count: this.state.count + 1})
      let newFields = this.state.fields
      const enemyFields = newFields.filter(field => field.value === null);
      let Randomitem = enemyFields[Math.floor(Math.random() * enemyFields.length)];
      if(Randomitem !== undefined && newFields[Randomitem.id].value === null){
        let newValue
        if(this.state.isYourCross){
          newValue = '0';
          this.setState({oLength: this.state.oLength +1})
        } else{
          newValue = 'X';
          this.setState({xLength: this.state.xLength +1})
        }
        newFields[Randomitem.id].value = newValue;

        this.setState({fields: newFields})
        this.checkWinner()
        if(this.state.sound){
          this.audio.play()
        }
      }
    }
  }
  //Автопроигрыш игры
  autoplayGame = () =>{
    if(!this.state.winner){
      let newFields = this.state.fields
      const enemyFields = newFields.filter(field => field.value === null);
      let Randomitem = enemyFields[Math.floor(Math.random() * enemyFields.length)];
      if(Randomitem !== undefined && newFields[Randomitem.id].value === null){
        const newValue = this.state.count % 2 == 0 ? 'X' : '0';
        newFields[Randomitem.id].value = newValue;
        if(newValue == 'X'){
          this.setState({xLength: this.state.xLength +1})
        } else{
          this.setState({oLength: this.state.oLength +1})
        }
        this.setState({fields: newFields, count: this.state.count + 1})
        this.checkWinner()
        if(this.state.sound){
          this.audio.play()
        }
        if(this.state.count <= 9 && !this.state.winner){
          setTimeout(this.autoplayGame, 500)
        }
      }
    }
  }
  //Перезагрузка игры
  restartGame = () =>{
    this.setState(
      {
        fields: [
          {
            id: 0,
            value: null
          },
          {
            id: 1,
            value: null
          },
          {
            id: 2,
            value: null
          },
          {
            id: 3,
            value: null
          },
          {
            id: 4,
            value: null
          },
          {
            id: 5,
            value: null
          },
          {
            id: 6,
            value: null
          },
          {
            id: 7,
            value: null
          },
          {
            id: 8,
            value: null
          },
          
        ],
        count: 0,
        winMessage: '',
        winner: false,
        xLength: 0,
        oLength: 0
      }
      
    )
  }
  //Выключаем или включаем звук в настроиках
  soundOff = (value) =>{
    this.setState({sound: value})
  }
  crossOrZero = (value) =>{
    this.setState({isYourCross: value})
  }
  showScore = (value) =>{
    this.setState({isShowScore: value})
    console.log(this.state)
  }

  render(){

    const listItems = this.state.fields.map((field) =>
      <div data={field.id} key={field.id} onClick={() => this.clickHander(field.id)} className='ttt-item'>
        {field.value}
      </div>
    );
    return(
      <>
        <Router>
          <Header/>
          <main>
            <Switch>
              <Route exact path="/">
                <div className='tic-tac'>
                  <div className="tic-tac__inner">
                    <div className="tic-tac-toe">
                      {listItems}
                    </div>
                    {this.state.isShowScore &&
                        <div className="score">
                          <h2>Score</h2>
                          <div className="score__item">Player <span>X</span> - {this.state.xLength}</div>
                          <div className="score__item">Player <span>0</span> - {this.state.oLength}</div>
                        </div>
                    }
                  </div>
                  <span className="winner-txt">{this.state.winMessage}</span> <br/>
                  <div className="btns">
                    <button className="btn-restart" onClick={() => this.restartGame()} >Restart</button>
                    <button className="btn-autoplay" onClick={() => this.autoplayGame()} >Autoplay</button>
                  </div>
                </div>
              </Route>
              <Route path="/settings">
               <Settings
                   crossOrZero={this.crossOrZero}
                   soundValue={this.state.sound}
                   soundOff={this.soundOff}
                   CrossZeroValue={this.state.isYourCross}
                   showScore = {this.showScore}
                   isShowScore={this.state.isShowScore}
               />
              </Route>
            </Switch>
          </main>
          <Footer/>
        </Router>
      </>

    )
  }
}
export default App;
