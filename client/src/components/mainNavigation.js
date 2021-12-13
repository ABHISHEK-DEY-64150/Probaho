import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';

export default function MainNavigation() {
	return (
		<header className={classes.header}>
			<div className={classes.logo}>Probaho</div>
			<nav>
				<ul>
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li>
						<Link to='/Post'>Post</Link>
					</li>
					<li>
						<Link to='/Register'>Sign Up</Link>
					</li>
					<li>
						<Link to='/Login'>Sign In</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
