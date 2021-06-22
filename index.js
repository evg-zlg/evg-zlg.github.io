import React from 'react';
import ReactDOM from 'react-dom';
import './style.css'; 

class PageSport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          count: 6,
          time: 45,
          buttonStart: 'Начать тренировку',
        };
    }
    
    handleClick(button) {
        switch (button) {
            case 'cPlus':
                this.setState({count: this.state.count +1});
                break;
            case 'cMinus':
                this.setState({count: this.state.count -1});    
                break;
            case 'tPlus':
                this.setState({time: this.state.time +5});    
                break;
            case 'tMinus':
                this.setState({time: this.state.time -5});    
                break;         
            case 'runCircle':
                this.setState({buttonStart: 'Сначала'});
                break;
        default:
            console.log('def')
        }
    }

    renderCircles() {
        return (
            <div>
                Количество кругов: {this.state.count} 
                <button 
                    className='plus' 
                    onClick={() => this.handleClick('cPlus')}
                >+ </button>
                <button 
                    className='minus' 
                    onClick={() => this.handleClick('cMinus')}
                >- </button>
                <p>Отдых: {this.state.time} сек. 
                <button 
                    className='plus' 
                    onClick={() => this.handleClick('tPlus')}
                >+ </button>
                <button 
                    className='minus' 
                    onClick={() => this.handleClick('tMinus')}
                >- </button></p>
            </div>
        )
    } 

    renderButton() {
        buttonStart = this.state.buttonStart;

        return(
            <div>
                <button 
                    className='runCircle' 
                    onClick={() => this.handleClick('runCircle')}
                > {buttonStart}
                </button>
                <button 
                >
                    Завершить круг 
                </button>
            </div>
        )
    }

    render() {
        return (
            <div className="pagesport">
                <h1>Тренировка</h1>
                <div className="sportitem">
                    <SportItem />
                </div>    
                <div className="circles">
                    {this.renderCircles()}
                </div>  
                <div className='buttons'>
                    {this.renderButton()}                        
                </div>

            </div>            
        )
    }    
}

class SportItem extends React.Component {
    render() {
        let itemlist = [{
            id: 0,
            title: 'Подтягивания',
            count: 3},
            {
            id: 1,
            title: 'Приседания',
            count: 12,
            },
            {
            id: 2,
            title: 'Отжимания',
            count: 12,
            },
            {
            id: 3,
            title: 'Выпады',
            count: 12,
            },
        ];
        
   //     const items = itemlist.length;

        return (
            <div className="sportitem">
                <p> {itemlist[0].title}: {itemlist[0].count}</p>        
                <p> {itemlist[1].title}: {itemlist[1].count}</p>
                <p> {itemlist[2].title}: {itemlist[2].count}</p>
                <p> {itemlist[3].title}: {itemlist[3].count}</p>
            </div>
        )
    }
}


ReactDOM.render(
    <PageSport />,
    document.getElementById('root')
  );