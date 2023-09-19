function enviarRespostasPorEmail() {
  var form = FormApp.openById('1gf-QxtswQUooTiQpXlJXHe90QOn8fxy54TO77SMU960'); // Substitua 'ID_DO_FORMULARIO' pelo ID do seu formulário
  var formResponses = form.getResponses();
  var emailPergunta = "Insira seu e-mail"; // Título da pergunta de e-mail
  var emails = [];

  var latestResponse = formResponses[formResponses.length - 1]; // Obtém a resposta mais recente do formulário

  var itemResponses = latestResponse.getItemResponses();
  var itemResponsesText = '';

  for (var j = 0; j < itemResponses.length; j++) {
    var pergunta = itemResponses[j].getItem().getTitle();
    var resposta = itemResponses[j].getResponse();

    if (pergunta === emailPergunta) {
      emails = resposta.split(",").map(function(email) {
        return email.trim();
      });
    } else {
      itemResponsesText += "<span style='font-size: 20px;'><strong>" + pergunta + ":</strong> " + resposta + "</span><br><br>"; // Ajustando o tamanho da fonte para 25 pixels para perguntas e respostas
    }
  }

  if (emails.length > 0 && itemResponsesText !== '') {
    var assunto = "ATA - Reunião";
    var mensagem = "Abaixo, seguem os tópicos abordados em nossa reunião:<br><br>" + itemResponsesText;

    MailApp.sendEmail(emails.join(","), assunto, '', { htmlBody: mensagem });
