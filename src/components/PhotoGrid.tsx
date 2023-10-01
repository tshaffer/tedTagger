import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import '../styles/TedTagger.css';
import Photo from './Photo';

import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@mui/material';

import MoreIcon from '@mui/icons-material/MoreVert';

import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';

export default function PhotoGrid() {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // const filePath0 = '/images/z/Q/AEEKk93Oefh3SiR5UC607K3zECgYkcbfO6qjDJwNC2UJJz_noM4obDfCy1uh1YkZNIN3XUrWp94LBFLJCWFjPFR7mMhcgA1BzQ.jpeg';
  // const filePath1 = '/images/4/A/AEEKk91Tx4PJKJMmMr3W4-k068eueZaFsIrvVusXNu1UQr2yQSi79vSoNzyZz0V8R7TZlwD_8Y_s-XmluOCL4e0ey7HwqcJn4A.jpg';
  // const filePath2 = '/images/6/Q/AEEKk90c-DA0Pb0MXE6GGpSZf0xmEReu3AVjQBCJoEjHtXt3mpRufLB2xUFMGR1vMq00HA7wcJ1lrEaMSAA-D8BbEJKFyaMd6Q.jpg';
  // const filePath3 = '/images/9/Q/AEEKk92TG30_-78TtFuU-L16Cns_wA8J8bWBJ5uytMPqAZzPliMBWSLrXhrS4HjnkpyIW0YGpKLcK1mZpFphZekyt13x8jlK9Q.jpg';
  // const filePath4 = '/images/e/A/AEEKk912PZxymMuIR4HV6_HtZFKDfcHykbqqSrNnGE4Z-r_jgEHg4IEF1KnuEhFx6lkKKw-waIIEdT9ZkSagtd1hB4XHOnLCeA.jpg';
  // const filePath5 = '/images/k/g/AEEKk90ZybQCwNsN0R0fvlm0fEpEKxuCmh2G6LTv9TjFlhZIQMIpzpRzDGtjVXVz0StKaIbYQGYlx47qurRXt1e-OT8bbonQkg.jpg';
  // const filePath6 = '/images/test.jpg';
  // const filePath7 = '/images/test.jpg';


  const filePath0 = '/images/R/A/AEEKk923qwJnNl4gkDzvgu3f-D9dboMhfGO8Ntxbmr3gPiDfwd2gLX-aSauyPIIGJWfAef-8NTo24TUbFZlT2j4BAv4PCXW6RA.JPG';
  const filePath1 = '/images/R/Q/AEEKk90_FSWEoRRl7zcRgtZXChWdc3kyO_0K-kkyTPUoB4jdNevDLK4zw6oowY5feNs4ExwMypTIzEGPwN19Embm8tgnXj1yRQ.jpg';
  const filePath2 = '/images/R/w/AEEKk91pCuKjKuWui9-ZUI0bJcgvUKnmT_T5rd_e9df3vQ-m3IH4cYSYkK3FOXSksWOG6ctlh4xLu_n-ituRz_y6rEQ0peJPRw.JPG';
  const filePath3 = '/images/U/Q/AEEKk902euXpC1_F6j9DxQUZaX_8FbX6hnYzCQSq9qdE_f0fWx5qwZuwvNrVTWZtKeluXk0MyQ8j2YKfgQTdj4Z-y-_1pIUkUQ.JPG';
  const filePath4 = '/images/9/A/AEEKk93JusJKiLt70NhvmTxAMCToZzZVf6KpwtMl_-jdR1zyrUVsezm_lG4Y855qNCHAuZfDYXvXmyfJv8op7pPqH1nI82qY9A.JPG';
  const filePath5 = '/images/I/A/AEEKk93idklgX6ttcl0f0ryE9YBchQliGWU70dEHASesJltBGSkgwcj30GuSGF8yx8sfLrd-r3NjXaC8upWgkS4olxs55zIaIA.JPG';
  const filePath6 = '/images/n/g/AEEKk91wTnB1C9jH9HGZo4890V2cd6KL6dAv3B2S9uwA7oM23i6ScQJg0q8Sr30IRXwhbFPtT5c58I7TjkAp8T-AdmRlRL_Wng.JPG';
  const filePath7 = '/images/n/A/AEEKk91agpC0OsVCWp-r4fy7dNB7dFX-suxuRazdrjTbOEYkfy0Ie1XxCyath1nA0wqjIDZznKKfvVpNgQxY2wFv9x-2z252nA.JPG';
  const filePath8 = '/images/n/Q/AEEKk93CWS0yoMkQNtRc6nW0CkATqO5kV37gPkoIWpN08uEVG5e0eNC_SK210rLqDP2gQQe06gZRLlhmH9nRVdIHsQrcYC8hNQ.JPG';
  const filePath9 = '/images/G/A/AEEKk90sV9uwWnX4dwd5d0zNhbbwFwFSUWciajLWSIjVYIh2uqgITBvNq5iePc9k2YbY4KmCVi09HY1iE8yTTl_swP110TwwGA.JPG';
  const filePath10 = '/images/G/A/AEEKk90fKW7PU4Ql_6QrV2m38UWl9-i6zCNHLuUSmfbXtb0LsxaNoXSZwa9pv3zfnU2t4zbVVZAsHz2eB8R7C3_eun19BVfYGA.JPG';
  const filePath11 = '/images/G/w/AEEKk91bSvJZyLi3N0DiXp7a9UWvSc9Xr4lGz4ZztAD2dsp86RqOQ59JcUNmYS9jaAQaBzC2w3QVqWYJmM7Eo0DMbHSCKfjXgw.JPG';
  const filePath12 = '/images/Z/A/AEEKk90wrLs0Cq8fcT8-HXR1CQE_kmAYb2y2AsoVk1rtrq8mRXC4SvAnjWZWSm0kGECjVPyYsq8yFxLreYXifPSmDhvz_MNRZA.jpg';
  const filePath13 = '/images/1/g/AEEKk91_LS2FI3pEH99xVEL1LjEmf3DvfYziOQpZcSFp2yk8jhO81cKc6m5t2ZViDWMLv9U4UAbLRwf_ECwq6ODU7vFQ6qGA1g.JPG';
  const filePath14 = '/images/1/g/AEEKk91oRj_Qv7CWAmk7P0Kx32zuxuIwCNPZ6HcDURZo2tkTcADXSKC_Z3HUTkCm46M8cxED6D3W7tW2nwI_iZXVqaBtGdkG1g.JPG';
  const filePath15 = '/images/1/Q/AEEKk92V8p0fJw6kmGC_XQQtQJszdtBfJFdEAWr-c5BYviGAL1lF1r58NhLZ0rQZZCl8OgRuJkHjEuycu2N-gP5ExqvKOchB1Q.JPG';
  const filePath16 = '/images/t/g/AEEKk90opRk2X85ciEK8zwtO884vUAfNgg2rjI_AfW6xZ3Kz6pENAGkXaMvtx2fFf43-eDqzAc3yaRXEanMa_riXMppjbu06tg.JPG';
  // /images/S/g/AEEKk927gsjDajAhylul5rVmuESqCJ5d6tGnLJuIq-KSb07xjm8KYN4W4tECb5mkmYHEYE-wm9hPYnZd5Hcsbh0kjYZMg1vMSg.jpg
  // /images/-/w/AEEKk91x2uhtGbZODK0mqZDrjmm0FvVpkjq00t0gVEdMoWOW6INveg4F4_uAtNUuPlA_DioyHgqY9u475BaKrIVb8TU84SNw-w.jpg
  // /images/o/w/AEEKk90Fx9zbfbE_1YBjDw6BrHlfnSWVtuYvPtcYmkWW8ZCUyL2QlqL2_krRkWMaTlA2gMTNx6eU0ob79Lqd_A9v9YYpXKyaow.JPG
  // /images/c/g/AEEKk92ue2g5NsFtBM6nWkEaYqH-tv5uG4UEgHEcfzCMrW0lBK42ExKjCBHz8-zfyzFLv22IPf7xQ6kCVqT2MiVes8Nx-PO7cg.JPG
  // /images/c/g/AEEKk91zgxriltM8lWDaUUQnfxGcdFplHWrvxg27rkmNEZaeicsGaVZjT5_d0fR4DxJvnt3g5OPG8aMPCInQRk3FWhLLQSZ-cg.JPG
  // /images/D/g/AEEKk92htSq0UToFPNIwrNb-YAsaLGftpwqvCw7xuMa2ncxx5PAvUBF1mjHnNyBIjRWi-b0-kxgMjecpE9QDwtPdEHjy0lefDg.jpg
  // /images/v/A/AEEKk90GUo8hnKSkr7oyt1c3PZ0svLBdTw6O277sYNzBf2NSbj6eiQlbmUYhD10ZOH6Bm463KrlGRESgbWKG7zrrcQOMLySAvA.JPG
  // /images/v/Q/AEEKk93_3gqGUNtymC9OtknbHfHp_kq0Icbkvju9crEgwMaoNGWMZTWIxz6JjISg52xc2oWVKkZe641DsXaj1tgdGPOSrOdLvQ.JPG
  // /images/Q/g/AEEKk92cZL_EDXJ5xV7X6NC0UAd3fBg2IzyfTcMFPu_VgQKqv0A79Ez4piSsk4t6bFpj7uOENkE_XxPzLCX11SoNtWo9AsMDQg.JPG
  // /images/Q/A/AEEKk9171LO4Bm_sSgHymwqzJkwdncnodR9zMYgaXg4sC1AmSdRLQzaQ-yjrWNEU-AUcqMYk1wcLuYVe89NjxwS_mPslPqdRqA.JPG
  // /images/Q/Q/AEEKk91RxtCRI7FQ_ASF8rxilLny0oytRNfbI9CeM07uGVqtKTYnoLKf3_xHFRMU9VmxlsU9eg3YqUP5H9RxweRuOI4LR1GyqQ.JPG
  // /images/4/A/AEEKk90qFazrzUoqjDGiqhMoQnD6gTnjpUcPi-GggTaAOI6hIIRsVir09vHj4XuWybk_gCCdACk335uTIVBglHOhWCnCVUSI4A.JPG
  // /images/E/g/AEEKk92MTWgpkIiQkJXtoh6OWu1c77djW1vcN9zoKn0pWJKXyQKB0bx-y8GxIyNUhCSWee-giRbcKPbmIMuiQo4Fo_QMg3IdEg.jpg
  // /images/E/A/AEEKk92NPiOu4Dort7OW4GjDU0D-jpdJ-gsRaVfI2M6L78tY9pwfLC7QseNLy7AkhmjDAfPdxDztaIn4_eCeudQOSRs8SlYjEA.JPG
  // /images/E/w/AEEKk90MNwGtfbt-ALy5Tq2rtrhxIDhrO7oXfnvnGDwonLBpFxfvreCvH99HkVIVNxmqh632Z_Dp1sov7WTKA2RmbYZfBeeGew.JPG
  // /images/k/A/AEEKk91N-dOQXsGg4M4FIoOSLVtDJHVXx-dl23U0MmP5JKDuhvx5ji6UlZeVnl1ehthF2Vb5L2KS6t3-oqzmY6G4SYZJIuP_kA.JPG
  // /images/k/A/AEEKk91sHEYDWSHRqGh-or1d_k0aRUNhdlBGzxinqCK22CCxgC8TYJNsxqGRcqeJCSQW2usZ9IDAbAbQIc9DBTd1sYGVzG9WkA.JPG
  // /images/k/Q/AEEKk91rMAjQq2qStNzOoj8f6srMvOoT2wztZhMeqpe4dyydbTPb2Pt3fMcgJIZmqS4h8mf_9PtGm8l3DGt7umMwxkf2BfN6kQ.JPG
  // /images/L/A/AEEKk91yLYa9suJK8fESsO-AmV1YzxsCb7zRPKyW1uM7kN6tX5m1kQFmOSr3tT6nU4I2siQndTPtsXoOfR-cQzIhi03ibdooLA.JPG
  // /images/Y/A/AEEKk92fSYCUBl2mr1DYsLvtkB9T2M0n61NXwNLuKg7Qta0hyzwizjsszeDPLer9X-lEGwIC1SaO4HfDo2pH3RfGJIlumQXWyA.jpg
  // /images/Y/Q/AEEKk93gSoAzQjYIwtrzdw_FNO09I7JeIkYY-HkDb0iRR7vj_jlHghcPVVUvVjlAg8Q7e23z3FJXcRiHGIpxPndN7H-40eAdYQ.jpg
  // /images/5/A/AEEKk90KXOH5NHbqqG2Y1C7O_8iDA7-g3dNkDcDo1BUNpsNOFg-bb_Om4mnMUIjFYP2bWEfK0npFkLEdziA_BpZJKoKKMRR55A.JPG
  // /images/W/w/AEEKk90s_ACF8tdJzxVUbhWoLgneLYmwYoAV_juXgXoEDfEe7SzHpipBo4SnQ0HVId0ZiIjncvzsCq-SIHQp5UxZAFi-4Aw3Ww.JPG

  const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  });

  const handleShowMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Photo
          filePath={filePath0}
        />
        <Photo
          filePath={filePath1}
        />
        <Photo
          filePath={filePath2}
        />
        <Photo
          filePath={filePath3}
        />
        <Photo
          filePath={filePath4}
        />
        <Photo
          filePath={filePath5}
        />
        <Photo
          filePath={filePath6}
        />
        <Photo
          filePath={filePath7}
        />
        <Photo
          filePath={filePath8}
        />
        <Photo
          filePath={filePath9}
        />
        <Photo
          filePath={filePath10}
        />
        <Photo
          filePath={filePath11}
        />
        <Photo
          filePath={filePath12}
        />
        <Photo
          filePath={filePath13}
        />
        <Photo
          filePath={filePath14}
        />
        <Photo
          filePath={filePath15}
        />
      </Grid>

      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            onClick={handleShowMore}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Tags</MenuItem>
        <MenuItem onClick={handleClose}>Properties</MenuItem>
      </Menu>

    </Box>
  );
}

