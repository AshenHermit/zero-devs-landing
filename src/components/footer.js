import { useEffect } from "react";
import { SkewedLineBgEl } from "./graphics_elements";
import { ExternalLink } from "./content_blocks";

export const Footer = () => {
    return (
      <footer>
        <SkewedLineBgEl half={true}/>
        <div className='footer-contents'>
          <div className='footer-nav'>
            <div className='footer-col'>
              <a className='link bold'>Download</a>
              <a className='link'>Latest Blender</a>
              <a className='link'>Blender LTS</a>
              <a className='link'>Blender Benchmark</a>
              <a className='link'>Previous Versions</a>
              <a className='link'>Experimental Builds</a>
              <a className='link'>Source Code</a>
              <a className='link'>Release Notes</a>
              <a className='link'>Requirements</a>
              <br/>
              <a className='link bold'>Organization</a>
              <a className='link'>People</a>
              <a className='link'>Jobs</a>
            </div>
            <div className='footer-col'>
              <a className='link bold'>Древнегреческие Боги Издетели</a>
              <ExternalLink href="https://www.devolverdigital.com/">Devolver Digital</ExternalLink>
              <ExternalLink href="https://chucklefish.org/">Chucklefish Ltd</ExternalLink>
              <a className='link'>License</a>
              <a className='link bold'>Боги Разработчики</a>
              <a className='link'>Credits</a>
              <a className='link'>Privacy Policy</a>
              <br/>
              <a className='link bold'>Articles</a>
              <a className='link'>News</a>
              <a className='link'>Press Releases</a>
              <a className='link'>User Stories</a>
            </div>
            <div className='footer-col'>
              <a className='link bold'>Get Involved</a>
              <a className='link'>Dashboard</a>
              <a className='link'>Development</a>
              <a className='link'>Documentation</a>
              <a className='link'>Education</a>
              <br/>
              <a className='link bold'>Donate</a>
              <a className='link'>Development Fund</a>
              <a className='link'>One-time Donations</a>
              <br/>
              <a className='link bold'>Blender Studio</a>
              <a className='link'>Films</a>
              <a className='link'>Training</a>
            </div>
            <div className='footer-col'>
              <a className='link bold'>Support</a>
              <a className='link'>Manual</a>
              <a className='link'>Community</a>
              <a className='link'>FAQ</a>
              <br/>
              <a className='link bold'>Список Пидарасов</a>
              <ExternalLink href="https://gamedev.ru/users/?id=85394">Skylordy</ExternalLink>
              <ExternalLink href="https://gamedev.ru/users/?id=80128">PeeKay</ExternalLink>
              <a className='link'>И много много других обиженных аглибастардов</a>
              <br/>
              <a className='link bold'>Blender Conference</a>
            </div>
            <div className='footer-col border-left'>
              <a className='link bold'>Follow Blender</a>
              <a className='link'>YouTube</a>
              <a className='link'>Twitter</a>
              <a className='link'>Instagram</a>
              <a className='link'>Facebook</a>
              <a className='link'>LinkedIn</a>
              <a className='link'>Mastodon</a>
            </div>
          </div>
          <div className='footer-center'>
          💟мы
          💘просто 
          💝ахуенные
          💖делайте
          💗с
          💓нами
          💞игры❣️
          <br/>
          💕 может я и пишу МЫ, но технически я тут один 💕
          </div>
        </div>
      </footer>
    );
  };
  