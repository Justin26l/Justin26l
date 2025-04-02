<!DOCTYPE html>
<html lang="<?=$this->lg?>">

<head>
<meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="xxxTerminal Provide pre-made and custom crypto trading bot, Automate Trades.">
    <meta name="keywords" content="crypto, cryptocurrency, automated trading, trading, strategy, crypto bot, trading bot, strategy bot, algo trade, btc, eth, bnb">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <title>xxxTerminal - <?=$this->lang->line('login',0)?></title>
    <link rel="shortcut icon" href="<?= base_url('static/favicon.ico') ?>">
    <link rel="stylesheet" href="<?= $this->bscss ?>">
    <link rel="stylesheet" href="<?= $this->css ?>">
    <style>
        .hide{display:none}
        .show{display:block}
        .form-control,.form-select{height:auto;box-sizing: border-box; border-radius: 0px; border-top:0px; border-left:0px; border-right:0px;}
        .form-control:focus,.form-select:focus,.btn-TCol:focus{border-bottom-color: rgba(230,150,0,0.25);box-shadow: 0 0.1rem rgba(250,150,0,0.25);} 
        .Oinp{margin: 0.25rem !important;font-size: calc(1.3rem + 0.6vw) !important;text-align: center !important;}
        .wcalc{width:calc(100% - 25px);}
        .ChildbdrRed input{border-bottom: 1px solid red;}
    </style>
</head>

<body style="margin: 0px;width:100%;">
    <!--Register-->
    <div id="register" class="text-center m-auto mt-5 pt-4 w-80 w-md-50 w-lg-30" style="display:none;">
        <h1 class="pb-3"><?=$this->lang->line('register',0)?></h1>
        <div class='form-floating pb-2'>
            <input id="Rname" type="text" class="form-control" placeholder='<?=$this->lang->line('name',0)?>'>
            <label id="nameConfig" for="Rname"><?=$this->lang->line('name',0)?></label>
        </div>
        <div class='form-floating pb-2'>
            <input id="Rmail" type="text" class="form-control" placeholder='<?=$this->lang->line('mail',0)?>'>
            <label id="mailConfig" for="Rmail"><?=$this->lang->line('mail',0)?></label>
        </div>
        <div class='form-floating pb-2'>
            <input id="Rarea" type="text" class="form-control" placeholder='<?=$this->lang->line('area',0)?>'>
            <label id="areaConfig" for="Rarea"><?=$this->lang->line('area',0)?></label>
        </div>
        <div class="row pb-2">
            <div class='form-floating col pe-2'>
                <input id="Rpass1" type="password" class="form-control" placeholder='<?=$this->lang->line('pass',0)?>pass'>
                <label id="passConfig" for="Rpass1"><?=$this->lang->line('pass',0)?></label>
            </div>
            <div class='form-floating col ps-2'>
                <input id="Rpass2" type="password" class="form-control" placeholder='<?=$this->lang->line('passConf',0)?>'>
                <label id="" for="Rpass1"><?=$this->lang->line('passConf',0)?></label>
            </div>
        </div>
        <p class="gray"><?=$this->lang->line('passRule',0)?></p>

        <input id="RegisterPeekPass" type="checkbox" class="form-check-input" onclick="peekPass('#Rpass1')">
        <label for="RegisterPeekPass"><?=$this->lang->line('showPass',0)?></label><br>

        <h3 id="RegRespone" class="my-2"></h3>

        <button onclick="RegisterConfig('<?=base_url($this->lg.'/register?refer='.$refer)?>','<?=base_url($this->lg.'/login')?>')" class="btn btn-primary btn-wide btn-float mt-4">
            <h3 class="m-0 px-4"><?=$this->lang->line('register',0)?></h3>
        </button>
        <br>
        <button onclick="QS('#register').style.display='none';QS('#login').style.display='block';" class="btn btn-secondary btn-flat btn-pill hovbgTCol border-0 mt-4"><?=$this->lang->line('login',0)?></button>
    </div>

    <!-- login -->
    <div id="login" class="text-center m-auto my-5 py-5 w-80 w-md-50 w-lg-30">
        <div id="login_form" class="pt-5">
            <h1><?=$this->lang->line('login',0)?></h1><br>

            <div class='form-floating'>
                <input id="mail" type="text" class="form-control" placeholder='<?=$this->lang->line('mail',0)?>' >
                <label id="loginUserErr" for="mail"><?=$this->lang->line('mail',0)?></label><br>
            </div>

            <div class="form-floating">
                <input id="pass" type="password" class="form-control d-inline wcalc" placeholder="Password">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 442.04 442.04" fill="gray" height="20px" width="20px" onclick="peekPass('#pass')">
                    <path d="M221.02 341.304c-49.708 0-103.206-19.44-154.71-56.22-38.502-27.494-62.266-54.733-63.259-55.881a12.5 12.5 0 0 1 0-16.367c.993-1.146 24.756-28.387 63.259-55.881 51.505-36.777 105.003-56.219 154.71-56.219 49.708 0 103.207 19.441 154.71 56.219 38.502 27.494 62.266 54.734 63.259 55.881a12.5 12.5 0 0 1 0 16.367c-.993 1.146-24.756 28.387-63.259 55.881-51.503 36.779-105.001 56.22-154.71 56.22zM29.638 221.021c9.61 9.799 27.747 27.03 51.694 44.071 32.83 23.361 83.714 51.212 139.688 51.212s106.859-27.851 139.688-51.212c23.944-17.038 42.082-34.271 51.694-44.071-9.609-9.799-27.747-27.03-51.694-44.071-32.829-23.362-83.714-51.212-139.688-51.212s-106.858 27.85-139.688 51.212c-23.944 17.038-42.082 34.269-51.694 44.071z"></path>
                    <path d="M221.02 298.521c-42.734 0-77.5-34.767-77.5-77.5s34.766-77.5 77.5-77.5a77.436 77.436 0 0 1 51.048 19.188c5.193 4.549 5.715 12.446 1.166 17.639-4.549 5.193-12.447 5.714-17.639 1.166a52.448 52.448 0 0 0-34.576-12.993c-28.949 0-52.5 23.552-52.5 52.5s23.551 52.5 52.5 52.5c28.95 0 52.5-23.552 52.5-52.5 0-6.903 5.597-12.5 12.5-12.5s12.5 5.597 12.5 12.5c.002 42.733-34.765 77.5-77.499 77.5z"></path>
                    <path d="M221.02 246.021c-13.785 0-25-11.215-25-25s11.215-25 25-25c13.786 0 25 11.215 25 25s-11.214 25-25 25z"></path>
                </svg>
                <label id="loginPassErr" for="pass"><?=$this->lang->line('pass',0)?></label><br>
            </div>

            <h4 id="LoginRespone">&nbsp;</h4>
            
            <input id="remember" type="checkbox" class="form-check-input" checked="">
            <label for="remember"><?=$this->lang->line('remmMe',0)?></label>
            <br>
            <a class="link" href="<?=base_url($this->lg.'/forgotpass')?>"><?=$this->lang->line('forgotPass',0)?></a>
            <br>

            <button id="MikeOxMaul" class="btn btn-primary btn-wide btn-float mt-4" onclick="LoginConfig('<?=base_url($_SERVER['REQUEST_URI'])?>','<?=base_url($this->lg.'/dashboard')?>')">
                <h3 class="m-0 px-4"><?=$this->lang->line('login',0)?></h3>
            </button>
            <br>
            <button onclick="QS('#login').style.display='none';QS('#register').style.display='block';" class="btn btn-secondary btn-flat btn-pill hovbgTCol border-0 mt-4"><?=$this->lang->line('register',0)?></button>
        </div>
    </div>

    
    <!-- 2FA -->
    <div id="Auth" class="text-center m-auto my-5 py-5 w-80 w-md-50 w-lg-30" style="display:none;">
            <h1 class="mt-5 pt-5">Verification</h1>
            <p class="gray">Authenticator OTP</p>
                <form id="otp" action="#">
                    <div class="d-flex mb-3">
                        <input id="o1" type="number" class="form-control Oinp">
                        <input id="o2" type="number" class="form-control Oinp">
                        <input id="o3" type="number" class="form-control Oinp">
                        <input id="o4" type="number" class="form-control Oinp">
                        <input id="o5" type="number" class="form-control Oinp">
                        <input id="o6" type="number" class="form-control Oinp">
                    </div>
                </form>
                <button type="text" id="otpOxMaul" onclick="LoginConfig('<?=base_url($this->lg.'/login')?>','<?=base_url($this->lg.'/dashboard')?>')" class="w-60 btn btn-primary">Verify</button>
                <div class="py-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50px" viewBox="0 0 1024 1024">
                        <path d="m457.07 45.92c73.67-8.62 149.41.22 218.93 26.24 62.75 23.47 120.59 60.41 167.72 108.09-40.31 39.97-80.25 80.31-120.51 120.33-25.95-25.45-56.19-46.65-89.47-61.37-44.22-19.82-93.39-28.54-141.72-25.2-54.6 3.52-108.11 22.49-152.63 54.3-55.24 38.95-96.61 97.22-114.8 162.35-13.64 47.78-14.77 98.97-3.76 147.4 8.85 39.61 26.09 77.29 50.05 110.03 22.24 30.45 50.3 56.64 82.22 76.71 36.79 23.24 78.76 38.22 121.96 43.48 37.02 4.65 74.9 2.23 111.05-7 3.97-1.91 6.24 2.61 8.73 4.86 40.74 40.95 81.68 81.7 122.43 122.63-73.31 35.6-155.99 51.86-237.3 46.12-68.05-4.51-135.07-24.08-194.71-57.18-24.87-13.6-48.23-29.82-70.33-47.54-17.46-14.81-34.71-30.01-49.72-47.35-25.41-27.39-47.21-58.11-65.17-90.87-4-7.72-8.64-15.12-11.9-23.2-4.47-9.05-8.37-18.36-12.25-27.67-4.96-13.27-10.26-26.44-13.88-40.15-.43-1.81-1.53-3.33-2.52-4.85-8.3-28.66-12.95-58.33-15.44-88.04-2.62-37.36-1.33-75.05 4.78-112.03 12.18-75.48 43.41-147.74 89.86-208.44 30.12-39.5 66.53-74.21 107.46-102.35 62.44-43.11 135.53-70.69 210.92-79.3m49.18 50.48c-5.7.99-10.96 3.76-15.38 7.43-10.4 8.93-14.14 24.81-8.17 37.28 6.33 15.02 25.16 23.1 40.36 17 15.43-5.24 24.78-23.51 19.74-39.06-4.1-15.43-20.92-25.79-36.55-22.65m-267.96 111.99c-5.33.28-10.59 1.92-15.16 4.68-11.47 7.03-17.88 21.74-14.36 34.86 3.09 14.08 16.78 25.06 31.26 24.61 15.03.41 29.08-11.39 31.54-26.17 2.24-10.33-1.61-21.55-9.14-28.85-6.24-6.33-15.3-9.62-24.14-9.13m-115.96 272c-6.62 1.23-12.84 4.58-17.54 9.4-9.45 9.72-11.72 25.57-5.02 37.42 7.16 13.96 25.48 20.86 39.98 14.62 15.02-5.51 23.99-23.42 19.06-38.71-4.04-15.41-20.86-25.96-36.48-22.73m111.98 272.05c-11.49 1.95-21.48 10.72-24.84 21.88-3.87 11.63-.13 25.16 8.9 33.36 6.15 5.48 14.4 8.7 22.67 8.32 11.16-.25 21.98-6.87 27.12-16.8 4.93-8.83 5.15-20.02.71-29.1-5.82-12.78-20.81-20.33-34.56-17.66m272.06 112.03c-11.76 2.02-21.92 11.07-25.09 22.6-3.87 12.57 1.13 27.25 11.91 34.79 7.86 5.79 18.42 7.67 27.77 4.86 9.61-2.77 17.7-10.24 21.07-19.68 4.97-12.74.36-28.32-10.58-36.46-7.02-5.45-16.35-7.67-25.08-6.11z" fill="#a0a0a0"></path><g fill="#c1c1c1"><path d="m506.25 96.4c15.63-3.14 32.45 7.22 36.55 22.65 5.04 15.55-4.31 33.82-19.74 39.06-15.2 6.1-34.03-1.98-40.36-17-5.97-12.47-2.23-28.35 8.17-37.28 4.42-3.67 9.68-6.44 15.38-7.43z"></path><path d="m122.33 480.39c15.62-3.23 32.44 7.32 36.48 22.73 4.93 15.29-4.04 33.2-19.06 38.71-14.5 6.24-32.82-.66-39.98-14.62-6.7-11.85-4.43-27.7 5.02-37.42 4.7-4.82 10.92-8.17 17.54-9.4z"></path></g><path d="m843.72 180.25.11-.11c24.64 25.12 46.96 52.6 65.61 82.47 36.01 57.16 59.38 122.22 67.87 189.25 5.67 44.88 5.27 90.6-2.05 135.27-12.7 80.01-46.94 156.41-97.9 219.36-42.3 52.48-95.87 96.04-156.41 125.76l-.63-.26c-1.01-1.1-2.03-2.16-3.05-3.22-40.75-40.93-81.69-81.68-122.43-122.63-2.49-2.25-4.76-6.77-8.73-4.86-36.15 9.23-74.03 11.65-111.05 7-43.2-5.26-85.17-20.24-121.96-43.48-31.92-20.07-59.98-46.26-82.22-76.71-23.96-32.74-41.2-70.42-50.05-110.03-11.01-48.43-9.88-99.62 3.76-147.4 18.19-65.13 59.56-123.4 114.8-162.35 44.52-31.81 98.03-50.78 152.63-54.3 48.33-3.34 97.5 5.38 141.72 25.2 33.28 14.72 63.52 35.92 89.47 61.37 40.26-40.02 80.2-80.36 120.51-120.33m-351.75 183.97c-21.23 2.85-41.89 10.28-59.88 21.94-23.08 14.45-41.76 35.58-53.9 59.91-14.58 29.2-18.64 63.21-12.5 95.17 3.93 19.85 12.03 38.88 23.56 55.51 7.93 11.52 17.65 21.66 27.65 31.38 57.33 57.41 114.61 114.86 171.99 172.21 49.09-13.07 94.67-38.94 131.05-74.4 45.11-43.34 75.66-101.44 86.31-163.06.24-1.04.22-2.91 1.85-2.6 29.63.04 59.26-.01 88.9.05 19.04-.3 36.87-14.77 40.76-33.46.22-1.21 0-2.32-.67-3.35 1.22-5.71 2.08-11.58 1.38-17.43l-.24.4c-2.05-20.34-20.84-37.12-41.25-37.17-80.64-.07-161.28-.01-241.93-.07-6.44-22.08-18.5-42.33-34.03-59.23-25.8-27.5-62.26-45.01-100.02-46.82-9.68.02-19.44-.54-29.03 1.02m286.37 388.31c-12.64 2.06-23.37 12.59-25.7 25.18-1.48 8.14-.14 17.02 4.73 23.85 5.76 9.2 16.8 14.76 27.61 14.25 8.32.03 16.28-3.95 22.16-9.66 4.87-5.6 8.45-12.67 8.67-20.2.86-11.37-5.06-23.1-14.87-28.96-6.52-4.46-14.89-5.75-22.6-4.46z" fill="#686868"></path><path d="m238.29 208.39c8.84-.49 17.9 2.8 24.14 9.13 7.53 7.3 11.38 18.52 9.14 28.85-2.46 14.78-16.51 26.58-31.54 26.17-14.48.45-28.17-10.53-31.26-24.61-3.52-13.12 2.89-27.83 14.36-34.86 4.57-2.76 9.83-4.4 15.16-4.68z" fill="#c3c3c3"></path><path d="m491.97 364.22c9.59-1.56 19.35-1 29.03-1.02 37.76 1.81 74.22 19.32 100.02 46.82 15.53 16.9 27.59 37.15 34.03 59.23-47.67-.01-95.35-.01-143.03-.01-12.19-.11-24.23 5.42-32.21 14.61-6.01 6.85-9.74 15.65-10.44 24.74-1.19 14.17 5.36 28.7 16.69 37.28 7.62 5.91 17.28 9 26.92 8.8 126.69-.04 253.39-.06 380.08.03 4.76.04 9.59-.15 14.2-1.48 14.21-3.82 26.02-15.47 29.83-29.7.67 1.03.89 2.14.67 3.35-3.89 18.69-21.72 33.16-40.76 33.46-29.64-.06-59.27-.01-88.9-.05-1.63-.31-1.61 1.56-1.85 2.6-10.65 61.62-41.2 119.72-86.31 163.06-36.38 35.46-81.96 61.33-131.05 74.4-57.38-57.35-114.66-114.8-171.99-172.21-10-9.72-19.72-19.86-27.65-31.38-11.53-16.63-19.63-35.66-23.56-55.51-6.14-31.96-2.08-65.97 12.5-95.17 12.14-24.33 30.82-45.46 53.9-59.91 17.99-11.66 38.65-19.09 59.88-21.94z" fill="#474747"></path><g fill="#bfbfbf"><path d="m479.81 483.85c7.98-9.19 20.02-14.72 32.21-14.61 47.68 0 95.36 0 143.03.01 80.65.06 161.29 0 241.93.07 20.41.05 39.2 16.83 41.25 37.17-.19.33-.58.97-.78 1.29-3.68-18.51-21.57-33.16-40.47-33.05-124.97.1-249.94.12-374.91.17-7.73.13-15.74-.8-23.15 1.96-9.06 2.84-16.73 9.1-22.27 16.7-3.34 4.55-4.39 10.24-7.28 15.03.7-9.09 4.43-17.89 10.44-24.74z"></path><path d="m234.31 752.44c13.75-2.67 28.74 4.88 34.56 17.66 4.44 9.08 4.22 20.27-.71 29.1-5.14 9.93-15.96 16.55-27.12 16.8-8.27.38-16.52-2.84-22.67-8.32-9.03-8.2-12.77-21.73-8.9-33.36 3.36-11.16 13.35-19.93 24.84-21.88z"></path></g><path d="m498.92 476.86c7.41-2.76 15.42-1.83 23.15-1.96 124.97-.05 249.94-.07 374.91-.17 18.9-.11 36.79 14.54 40.47 33.05.2-.32.59-.96.78-1.29l.24-.4c.7 5.85-.16 11.72-1.38 17.43-3.81 14.23-15.62 25.88-29.83 29.7-4.61 1.33-9.44 1.52-14.2 1.48-126.69-.09-253.39-.07-380.08-.03-9.64.2-19.3-2.89-26.92-8.8-11.33-8.58-17.88-23.11-16.69-37.28 2.89-4.79 3.94-10.48 7.28-15.03 5.54-7.6 13.21-13.86 22.27-16.7z" fill="#b0b0b0"></path><path d="m59.49 636.08c.99 1.52 2.09 3.04 2.52 4.85 3.62 13.71 8.92 26.88 13.88 40.15 3.88 9.31 7.78 18.62 12.25 27.67 3.26 8.08 7.9 15.48 11.9 23.2 17.96 32.76 39.76 63.48 65.17 90.87 15.01 17.34 32.26 32.54 49.72 47.35 22.1 17.72 45.46 33.94 70.33 47.54 59.64 33.1 126.66 52.67 194.71 57.18 81.31 5.74 163.99-10.52 237.3-46.12 1.02 1.06 2.04 2.12 3.05 3.22l.03.61c-42.32 21.03-87.88 35.53-134.56 42.91-56.91 8.9-115.46 7.49-171.82-4.5-67.89-14.35-132.42-44.21-187.42-86.51-63.52-48.63-114.32-113.73-145.86-187.27-8.42-19.87-15.93-40.22-21.2-61.15z" fill="#939393"></path><path d="m778.34 752.53c7.71-1.29 16.08 0 22.6 4.46 9.81 5.86 15.73 17.59 14.87 28.96-.22 7.53-3.8 14.6-8.67 20.2-5.88 5.71-13.84 9.69-22.16 9.66-10.81.51-21.85-5.05-27.61-14.25-4.87-6.83-6.21-15.71-4.73-23.85 2.33-12.59 13.06-23.12 25.7-25.18z" fill="#767676"></path><path d="m506.37 864.47c8.73-1.56 18.06.66 25.08 6.11 10.94 8.14 15.55 23.72 10.58 36.46-3.37 9.44-11.46 16.91-21.07 19.68-9.35 2.81-19.91.93-27.77-4.86-10.78-7.54-15.78-22.22-11.91-34.79 3.17-11.53 13.33-20.58 25.09-22.6z" fill="#bebebe"></path>
                    </svg>
                    <span class="h5 pt-3 grayGray">Authenticator</span>
                </div>
                <div class="row">
                    <a class="col-6" href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&amp;hl=zh&amp;gl=US&amp;pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1" target="_blank"><img class="w-100" alt="Get it on Google Play" src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"></a>
                    <a class="col-6" href="https://apps.apple.com/us/app/google-authenticator/id388497605?itsct=apps_box_badge&amp;itscg=10000" target="_blank"><!--30200--><img class="w-100" style="padding:5.5% 8%;box-sizing: border-box;" alt="Download on the App Store" src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1284940800&amp;h=7fc6b39acc8ae5a42ad4b87ff8c7f88d"></a>
                </div>
            </div>
        </div>
    </div>

    <!-- Mail Verify -->
    <div id="MailVrfy" class="text-center m-auto my-5 py-5 w-80 w-md-50 w-lg-30" style="display:none;">
        <h1 class="mt-5 pt-5">Email Verification</h1>
        <p class="gray">Please Check your Email Inbox</p>
        <input id="mailcode" type="number" class="form-control py-4 fs-3 fw-3 text-center">
        <button id="btnEmailCode" type="button" class="my-4 w-60 btn btn-primary" onclick="LoginConfig('<?=base_url($_SERVER['REQUEST_URI'])?>','<?=base_url($this->lg.'/dashboard')?>')">Verify</button>
    </div>

    <?php $this->load->view('nav');?>

    <script src="<?=$this->js?>"></script>
</body>

</html>