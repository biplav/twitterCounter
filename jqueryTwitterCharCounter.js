/* jQuery jqEasyCharCounter plugin
 * Examples and documentation at: http://www.jqeasy.com/
 * Version: 1.0 (05/07/2010)
 * No license. Use it however you want. Just keep this notice included.
 * Requires: jQuery v1.3+
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
(function($) {
    $.fn.extend({
        jqEasyCounter: function(givenOptions) {
            return this.each(function() {
                var $this = $(this),
                    options = $.extend({
                        maxChars: 140, // for tweets
                        remainingCharsWarning: 10,
                        msgPaddingTop: '3px',
                        msgFontSize: '14px',
                        msgFontColor: '#A0A0A0',
                        msgFontFamily: 'Arial',
                        msgTextAlign: 'right',
                        msgWarningColor: '#F00',
                        msgAppendMethod: 'insertAfter'
                    }, givenOptions);

                if(options.maxChars <= 0) return;

                // create counter element
                var jqEasyCounterMsg = $("<div class=\"jqEasyCounterMsg\">&nbsp;</div>");

                var jqEasyCounterMsgStyle = {
                    'font-size' : options.msgFontSize,
                    'font-family' : options.msgFontFamily,
                    'color' : options.msgFontColor,
                    'text-align' : options.msgTextAlign,
                    'padding-top': options.msgPaddingTop,
                    'width' : $this.outerWidth()
                };

                jqEasyCounterMsg.css(jqEasyCounterMsgStyle);
                // append counter element to DOM
                jqEasyCounterMsg[options.msgAppendMethod]($this);

                // bind events to this element
                $this
                    .bind('keydown keyup keypress', doCount)
                    .bind('focus paste', function(){setTimeout(doCount, 10);});

                function doCount(){
                    var remainder;

                    if ($this.hasClass("linkAsset"))
                        options.maxChars = 116; // Should match TwitterUtils.MESSAGE_WITH_URL_CHAR_LIMIT reduce one for space we add with the url
                    else
                        options.maxChars = 140; // Should match TwitterUtils.CHAR_LIMIT

                    remainder = (options.maxChars - twttr.txt.getTweetLength($this.val()));

                    if (remainder <= options.remainingCharsWarning){
                        jqEasyCounterMsg.css({"color" : options.msgWarningColor});
                    } else {
                        jqEasyCounterMsg.css({"color" : options.msgFontColor});
                    }

                    jqEasyCounterMsg.html(remainder);
                }

                doCount();
            });
        }
    });
})(jQuery);
