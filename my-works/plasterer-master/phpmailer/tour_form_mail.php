<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'artemdoc1@inbox.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'PaR77xBA1REh4ssA3'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('artemdoc1@inbox.ru'); // от кого будет уходить письмо?
// $mail->addAddress('artemdoc1@rambler.ru');     // Кому будет уходить письмо 
$mail->addAddress('doclko31@gmail.com');     // Кому будет уходить письмо /добавил еще один email
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

// $mail->Subject = 'Заявка с тестового сайта';
// $mail->Body    = '' .$name . ' оставил заявку, его телефон ' .$phone. '<br>Почта этого пользователя: ' .$email;
// $mail->AltBody = '';

$mail->Subject = 'ЗАЯВКА С САЙТА PLASTERER-MASTER.';
$mail->Body    = '<b>Пользователь '.$name.'</b> оставил заявку на запись для просмотра работ.<br>
				  <b>Его(её) номер телефона:</b> '.$phone.'.';
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
    header('location: thank-you.html');
}
?>