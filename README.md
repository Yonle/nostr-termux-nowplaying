## nostr-termux-nowplaying
Small nostr tool that automatically set user status with currently playing music with Termux:API

## Setting up
Ensure that [Termux:API](https://github.com/termux/termux-api) is installed in your phone.

Update package list
```sh
pkg update
```

You may need to upgrade Termux env:
```sh
pkg upgrade -y
```

Then install required packages, and continue:
```sh
apt install git nodejs termux-api
git clone https://github.com/Yonle/nostr-termux-nowplaying
cd nostr-termux-nowplaying
npm install
```

Ensure that you've granted notification permission to Termux:API. Execute the following command and make sure that it gives JSON output.
```sh
termux-notification-list
```
Or once you've granted permission, Press CTRL+C and reexecute the same command again.

## Configuring
Insert your nostr private key into `privatekey.txt`:
```sh
echo nsec.... > privatekey.txt
```

Edit `relays.txt` and insert relay addresses (separated by new spaces) that you want to publish your update at:
```sh
nano relays.txt
```

```
  GNU nano 7.2    relays.txt    Modified
wss://example.com
wss://example2.com
```

Once you are done, Save it by pressing CTRL + S, and exit from nano by pressing CTRL + X

Finally, You could start the receiver.
```
node index.mjs
```

## License
Copyright 2023 Yonle <yonle@lecturify.net>

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
