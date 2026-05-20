$urls = @{
  "work-01.jpg" = "https://static.tildacdn.com/tild6631-3938-4231-b139-653131323665/_1.jpg"
  "work-02.jpg" = "https://static.tildacdn.com/tild6364-6532-4033-a632-316531636133/1deaa990-c5fb-461e-8.jpg"
  "work-03.jpg" = "https://static.tildacdn.com/tild3566-6134-4533-a666-633032663338/5B4D50A7-800D-4D2F-9.jpg"
  "work-04.jpg" = "https://static.tildacdn.com/tild3864-6438-4562-b934-323739376336/5E2A8902-73AF-4C3C-8.jpg"
  "work-05.jpg" = "https://static.tildacdn.com/tild3163-3839-4534-b430-326234363133/WhatsApp_Image_2021-.jpeg"
  "work-06.jpg" = "https://static.tildacdn.com/tild6664-6665-4361-b336-386161323638/8204D581-8ABF-4346-9.jpeg"
  "work-07.jpg" = "https://static.tildacdn.com/tild3339-6463-4835-a330-363964633130/BE8E3EAF-A900-415A-A.jpeg"
  "work-08.jpg" = "https://static.tildacdn.com/tild6261-3838-4339-b532-306633343462/D13F139C-8210-4AFD-B.jpeg"
  "work-09.jpg" = "https://static.tildacdn.com/tild3666-6338-4063-b365-623036316136/PHOTO-2020-12-18-08-.jpg"
  "work-10.jpg" = "https://static.tildacdn.com/tild3231-6435-4335-a666-373138653036/WhatsApp_Image_2021-.jpeg"
  "work-11.jpg" = "https://static.tildacdn.com/tild3164-3836-4339-b538-303531306130/WhatsApp_Image_2021-.jpg"
  "work-12.jpg" = "https://static.tildacdn.com/tild3262-3039-4434-b133-313764356238/WhatsApp_Image_2021-.jpg"
  "work-13.jpg" = "https://static.tildacdn.com/tild6234-3736-4037-b136-353332363864/WhatsApp_Image_2021-.jpg"
  "work-14.jpg" = "https://static.tildacdn.com/tild3236-3532-4631-b961-323165333562/WhatsApp_Video_2021-.jpg"
  "work-15.jpg" = "https://static.tildacdn.com/tild6233-6535-4336-b664-323966623333/5BF21296-11DE-4021-B.jpg"
  "work-16.jpg" = "https://static.tildacdn.com/tild3937-3439-4036-b933-303433396439/82006C7B-5D08-4189-8.jpeg"
  "work-17.jpg" = "https://static.tildacdn.com/tild3561-3165-4631-b636-653438313635/85F30A7C-6D59-48C3-9.jpg"
  "work-18.jpg" = "https://static.tildacdn.com/tild3433-6533-4332-b934-363434363766/262EB98F-075A-4060-B.jpeg"
  "work-19.jpg" = "https://static.tildacdn.com/tild3632-6137-4831-a365-353136353837/4444.jpg"
  "work-20.jpg" = "https://static.tildacdn.com/tild3833-3130-4565-a362-633732666564/1.jpg"
  "work-21.jpg" = "https://static.tildacdn.com/tild3866-3337-4739-a264-643330626230/02542EED-D670-4972-B.jpg"
  "work-22.jpg" = "https://static.tildacdn.com/tild6432-3638-4933-b166-643866393833/9E042694-14D2-4592-B.jpg"
  "work-23.jpg" = "https://static.tildacdn.com/tild6363-3037-4633-b035-356666386435/00bb1c2bd9b8e2d2bb4e.jpg"
}

$dst = "public\images\led"
New-Item -ItemType Directory -Path $dst -Force | Out-Null
foreach ($k in $urls.Keys) {
  $out = Join-Path $dst $k
  try {
    Invoke-WebRequest -Uri $urls[$k] -OutFile $out -UserAgent "Mozilla/5.0" -ErrorAction Stop
    Write-Host "OK: $k"
  } catch {
    Write-Host "FAIL: $k - $($_.Exception.Message)"
  }
}
