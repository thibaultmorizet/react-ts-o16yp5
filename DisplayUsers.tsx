import React, { Component } from 'react';

interface IUser {
  firstname: string;
}

interface AppProps {}
interface AppState {
  users: IUser[];
}

class DisplayUsers extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);

    this.state = {
      users: [
        {
          firstname: 'Joe',
        },
        {
          firstname: 'Toto',
        },
        {
          firstname: 'Yanis',
        },
      ],
    };
  }

  addUser = () => {
    /*this.state.users.push({ // PROBLEME ICI ! Change l'état précédent
      firstname: 'NOUVEAU PRENOM',
    });*/

    // BONNE PRATIQUE ! On crée une nouvelle référence sans jamais modifier celle d'avant
    const newUsers = [...this.state.users, { firstname: 'NOUVEAU PRENOM' }];

    this.setState({
      users: newUsers,
    });
  };

  onRemoveUser = (index: number) => {
    /*const newUsers = this.state.users;
    newUsers.splice(index, 1); // PROBLEME ICI ! On modifie la référence !
    */

    const newUsers = this.state.users.filter(
      (u: IUser, i: number) => i !== index
    );
    this.setState({
      users: newUsers,
    });
  };

  onUpdateUserFirstname = () => {
    /*const newUsers = this.state.users;
    newUsers[0].firstname = 'Nouveau ...'; // PROBLEME ICI ! On modifie la référence !*/

    const newUsers = this.state.users.map((u: IUser, i: number) => {
      if (i === 0) {
        /*u.firstname = 'Nouveau'; // PROBLEME, on modifie la référence d'avant 
        return u;*/
        return {
          ...u,
          firstname: 'Nouveau',
        };
      }

      return u; // Sinon, on ne fait rien, on renvoie le user tel quel
    });

    this.setState({
      users: newUsers,
    });
  };

  render() {
    const tabUsers = this.state.users.map((u: IUser, i: number) => (
      <li>
        {u.firstname}{' '}
        <span onClick={() => this.onRemoveUser(i)} className="delete">
          (supprimer)
        </span>
      </li>
    ));

    return (
      <div>
        <ul>{tabUsers}</ul>

        <button onClick={this.addUser}>Ajouter un utilisateur</button>
        <button onClick={this.onUpdateUserFirstname}>
          Modifier 1er utilisateur
        </button>
      </div>
    );
  }
}

export default DisplayUsers;
