import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Just share</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className={styles.dataContainer}>
				<div className={styles.title}>Namaste 🙏</div>
				<br />
				<div className={styles.header}>Welcome to Web3!</div>

				<div className={styles.bio}>
					Just share something here. Maybe your favorite quote? song?
					poem? book? Whatever you share here will be stored on the
					blockchain!
				</div>
				<div className={styles.bio}>
					Blockchain applications requires you to authenticate by
					signing in with your Crypto wallet. (You can sign up for one
					at Metamask)
				</div>

				{/* <button className="waveButton" onClick={wave}> */}
				<input
					className={styles.TextField}
					placeholder="Enter your message here"
				></input>
				<div className={styles.grid}>
					<button className={styles.waveButton}>Wave at Me</button>
					<button className={styles.connectWallet}>
						Connect Wallet
					</button>
				</div>
			</div>
		</div>
	);
}
