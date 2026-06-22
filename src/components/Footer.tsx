import { footerData } from './constants';

const Footer = () => {
	return (
		<div className='absolute bottom-0 left-0 right-0 mx-auto text-center pb-10'>
			<div className='flex gap-4 justify-center'>
				{footerData.map((data, index) => (
					<div key={data.link} className='flex gap-4 items-center'>
						<a 
							href={data.link} 
							target='_blank' 
							rel='noopener noreferrer'
						>
							{data.name}
						</a>
						{index < footerData.length - 1 && <span>|</span>}
					</div>
				))}
			</div>
		</div>
	);
};

export default Footer;
