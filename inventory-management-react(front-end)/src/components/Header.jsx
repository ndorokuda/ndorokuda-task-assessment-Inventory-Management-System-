import { FaDownload, FaPlus } from 'react-icons/fa6';
import Button from './Button';

const Header = ({
  buttonText,
  handleClick,
  handleClickSelectedItems,
  linkTo,
}) => {
  return (
    <div>
      <div className='w-full p-5 flex justify-between'>
        {/* Button to add new item to Inventory */}
        <Button
          text={buttonText}
          icon={FaPlus}
          buttonClasses={'bg-skyBlue hover:bg-sky-700'}
          linkTo={linkTo}
        />
        <div className='flex gap-2'>
          {/* Button to export all inventory items to PDF file */}
          <Button
            text={'Export all to PDF'}
            icon={FaDownload}
            buttonClasses={'bg-darkCharcol hover:bg-slate-500'}
            handleClick={handleClick}
          />
          {/* Button to export selected inventory items to PDF file */}
          <Button
            text={'Export selected items to PDF'}
            icon={FaDownload}
            buttonClasses={'bg-warmYellow hover:bg-yellow-700'}
            handleClick={handleClickSelectedItems}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
