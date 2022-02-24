import { AiFillHeart } from "react-icons/ai"
import { MdRefresh } from "react-icons/md"
import { RiShareBoxLine } from "react-icons/ri"
import { GiShare } from "react-icons/gi"
import { FiMoreVertical } from "react-icons/fi"

// GeneralDetails.js
const style = {
  wrapper: `flex`,
  infoContainer: `h-36 flex flex-col flex-1 justify-between mb-6`,
  accent: `text-[#2081e2]`,
  nftTitle: `text-3xl font-extrabold`,
  otherInfo: `flex`,
  ownedBy: `text-[#8a939b] mr-4`,
  likes: `flex items-center text-[#8a939b]`,
  likeIcon: `mr-1`,
  actionButtonsContainer: `w-44`,
  actionButtons: `flex container justify-between text-[1.4rem] border-2 rounded-lg`,
  actionButton: `my-2`,
  divider: `border-r-2`,
}

export default function GeneralDetails({ selectedNft }: { selectedNft: any }) {
    return (
      <div className={style.wrapper}>
        <div className={style.infoContainer}>
          <div className={style.accent}>Monkey Cute</div>
          <div className={style.nftTitle}>{selectedNft?.name}</div>
          <div className={style.otherInfo}>
            <div className={style.ownedBy}>
              Owned by <span className={style.accent}>trianurdinb</span>
            </div>
            <div className={style.likes}>
              <AiFillHeart className={style.likeIcon} /> 2.1K favorites
            </div>
          </div>
        </div>
        <div className={style.actionButtonsContainer}>
          <div className={style.actionButtons}>
            <div className={`${style.actionButton} ml-2`}>
              <MdRefresh />
            </div>
            <div className={style.divider}></div>
            <div className={style.actionButton}>
              <RiShareBoxLine />
            </div>
            <div className={style.divider}></div>
            <div className={style.actionButton}>
              <GiShare />
            </div>
            <div className={style.divider}></div>
            <div className={style.actionButton}>
              <FiMoreVertical />
            </div>
          </div>
        </div>
      </div>
    )
}